package routes

import (
	"encoding/base64"
	"fmt"
	"net/http"
	"strconv"

	"github.com/decred/dcrd/dcrutil"
	"github.com/go-chi/chi"
	"github.com/raedahgroup/dcrlibwallet"
	"github.com/raedahgroup/dcrlibwallet/txhelper"
	"github.com/raedahgroup/godcr/app/walletcore"
	"github.com/skip2/go-qrcode"
)

func (routes *Routes) createWalletPage(res http.ResponseWriter, req *http.Request) {
	seed, err := routes.walletMiddleware.GenerateNewWalletSeed()
	if err != nil {
		routes.renderError(fmt.Sprintf("Error generating seed for new wallet: %s", err.Error()), res)
		return
	}

	data := struct{ Seed string }{seed}
	routes.render("createwallet.html", data, res)
}

func (routes *Routes) createWallet(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	seed := req.FormValue("seed")
	passhprase := req.FormValue("password")

	err := routes.walletMiddleware.CreateWallet(passhprase, seed)
	if err != nil {
		routes.renderError(fmt.Sprintf("Error creating wallet: %s", err.Error()), res)
		return
	}

	// wallet created successfully, wallet is now open, perform first sync
	routes.walletExists = true
	routes.syncBlockchain()

	http.Redirect(res, req, "/", 303)
}

func (routes *Routes) overviewPage(res http.ResponseWriter, req *http.Request) {
	accounts, err := routes.walletMiddleware.AccountsOverview(walletcore.DefaultRequiredConfirmations)
	if err != nil {
		routes.renderError(fmt.Sprintf("Error fetching account balance: %s", err.Error()), res)
		return
	}

	req.ParseForm()
	showDetails := req.FormValue("detailed") != ""

	data := map[string]interface{}{
		"accounts": accounts,
		"detailed": showDetails,
	}

	txns, _, err := routes.walletMiddleware.TransactionHistory(routes.ctx, -1, 5)
	if err != nil {
		data["loadTransactionErr"] = fmt.Sprintf("Error fetching recent activity: %s", err.Error())
	}
	data["transactions"] = txns

	routes.render("overview.html", data, res)
}

func (routes *Routes) sendPage(res http.ResponseWriter, req *http.Request) {
	accounts, err := routes.walletMiddleware.AccountsOverview(walletcore.DefaultRequiredConfirmations)
	if err != nil {
		routes.renderError(fmt.Sprintf("Error fetching accounts: %s", err.Error()), res)
		return
	}

	data := map[string]interface{}{
		"accounts": accounts,
	}
	routes.render("send.html", data, res)
}

func (routes *Routes) maxSendAmount(res http.ResponseWriter, req *http.Request) {
	data := map[string]interface{}{}
	defer renderJSON(data, res)

	payload, err := retrieveSendPagePayload(req)
	if err != nil {
		data["error"] = fmt.Sprintf("Cannot get max amount: %s", err.Error())
		return
	}

	// if no input is selected, then use all inputs.
	// This is so as to make set max amount possible for situations where custom inputs are not sent
	if len(payload.utxos) == 0 {
		payload.utxos, payload.totalInputAmount, err = walletcore.GetAllUtxos(routes.walletMiddleware, payload.sourceAccount, payload.requiredConfirmations)
		if err != nil {
			data["error"] = fmt.Sprintf("Cannot get max amount, error fetching unspent outputs for new tx: %s", err.Error())
			return
		}
	}

	selectedAddress := req.FormValue("selected-address")
	for i := 0; i < len(payload.sendDestinations); i++ {
		// the amount field of the selected address is set to 0 from the frontend
		if payload.sendDestinations[i].Address == selectedAddress && payload.sendDestinations[i].Amount == 0 {
			payload.sendDestinations = append(payload.sendDestinations[:i], payload.sendDestinations[i+1:]...)
			break
		}
	}

	if payload.totalSendAmount >= payload.totalInputAmount {
		data["error"] = "Total send amount is already at maximum"
		return
	}

	changeAmount, err := txhelper.EstimateChange(len(payload.utxos), payload.totalInputAmount, payload.sendDestinations, []string{selectedAddress})

	if err != nil {
		data["error"] = fmt.Sprintf("Error in getting max send amount: %s", err.Error())
		return
	}
	data["amount"] = dcrutil.Amount(changeAmount).ToCoin()
}
func (routes *Routes) submitSendTxForm(res http.ResponseWriter, req *http.Request) {
	data := map[string]interface{}{}
	defer renderJSON(data, res)

	payload, err := retrieveSendPagePayload(req)
	if err != nil {
		data["error"] = err.Error()
		return
	}

	var txHash string
	if payload.useCustom {
		if len(payload.changeDestinations) < 1 {
			payload.changeDestinations, err = walletcore.GetChangeDestinationsWithRandomAmounts(routes.walletMiddleware, 1, payload.totalInputAmount,
				payload.sourceAccount, len(payload.utxos), payload.sendDestinations)
			if err != nil {
				return
			}
		}
		txHash, err = routes.walletMiddleware.SendFromUTXOs(payload.sourceAccount, payload.requiredConfirmations, payload.utxos, payload.sendDestinations, payload.changeDestinations, payload.passphrase)
	} else {
		txHash, err = routes.walletMiddleware.SendFromAccount(payload.sourceAccount, payload.requiredConfirmations, payload.sendDestinations, payload.passphrase)
	}
	if err != nil {
		data["error"] = err.Error()
		return
	}

	data["txHash"] = txHash
}

func (routes *Routes) receivePage(res http.ResponseWriter, req *http.Request) {
	accounts, err := routes.walletMiddleware.AccountsOverview(walletcore.DefaultRequiredConfirmations)
	if err != nil {
		routes.renderError(fmt.Sprintf("Error fetching accounts: %s", err.Error()), res)
		return
	}

	data := map[string]interface{}{
		"accounts": accounts,
	}

	data = routes.fillAddressData(data, accounts[0].Number)
	if _, has := data["imageData"]; has {
		data["imageStr"] = fmt.Sprintf("<img data-target=\"receive.image\" src=\"%s\"/>", data["imageData"])
	}

	routes.render("receive.html", data, res)
}

func (routes *Routes) generateReceiveAddress(res http.ResponseWriter, req *http.Request) {
	data := map[string]interface{}{}
	defer renderJSON(data, res)

	accountNumberStr := chi.URLParam(req, "accountNumber")
	accountNumber, err := strconv.ParseUint(accountNumberStr, 10, 32)
	if err != nil {
		data["success"] = false
		data["message"] = err.Error()
		return
	}
	data = routes.fillAddressData(data, uint32(accountNumber))
}

func (routes *Routes) fillAddressData(data map[string]interface{}, accountNumber uint32) map[string]interface{} {
	address, err := routes.walletMiddleware.GenerateNewAddress(accountNumber)
	if err != nil {
		data["success"] = false
		data["message"] = err.Error()
		return data
	}

	png, err := qrcode.Encode(address, qrcode.Medium, 256)
	if err != nil {
		data["success"] = false
		data["message"] = err.Error()
		return data
	}

	// encode to base64
	encodedStr := base64.StdEncoding.EncodeToString(png)
	imgStr := fmt.Sprintf("data:image/png;base64,%s", encodedStr)

	data["success"] = true
	data["address"] = address
	data["imageData"] = imgStr
	return data
}

func (routes *Routes) getUnspentOutputs(res http.ResponseWriter, req *http.Request) {
	data := map[string]interface{}{}
	defer renderJSON(data, res)

	accountNumberStr := chi.URLParam(req, "accountNumber")
	accountNumber, err := strconv.ParseUint(accountNumberStr, 10, 32)
	if err != nil {
		data["success"] = false
		data["message"] = err.Error()
		return
	}

	requiredConfirmations := walletcore.DefaultRequiredConfirmations

	spendUnconfirmed := req.URL.Query().Get("spend-unconfirmed")
	if spendUnconfirmed == "true" {
		requiredConfirmations = 0
	}

	utxos, err := routes.walletMiddleware.UnspentOutputs(uint32(accountNumber), 0, int32(requiredConfirmations))
	if err != nil {
		data["success"] = false
		data["message"] = err.Error()
		return
	}

	data["success"] = true
	data["message"] = utxos
}

func (routes *Routes) getRandomChangeOutputs(res http.ResponseWriter, req *http.Request) {
	data := map[string]interface{}{}
	defer renderJSON(data, res)

	payload, err := retrieveSendPagePayload(req)
	if err != nil {
		data["error"] = err.Error()
		return
	}

	req.ParseForm()

	nChangeOutputsStr := req.FormValue("nChangeOutput")
	nChangeOutputs, err := strconv.ParseInt(nChangeOutputsStr, 10, 32)
	if err != nil {
		data["error"] = err.Error()
		return
	}

	if payload.totalSendAmount >= payload.totalInputAmount {
		data["error"] = "Error in getting change amount: total input amount cannot cover total send amount and transaction fee"
		return
	}

	changeOutputDestinations, err := walletcore.GetChangeDestinationsWithRandomAmounts(routes.walletMiddleware,
		int(nChangeOutputs), payload.totalInputAmount, payload.sourceAccount, len(payload.utxos), payload.sendDestinations)
	if err != nil {
		data["error"] = err.Error()
		return
	}
	data["message"] = changeOutputDestinations
}

func (routes *Routes) historyPage(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	start := req.FormValue("start")

	startBlockHeight, err := strconv.ParseInt(start, 10, 32)
	if err != nil || startBlockHeight < 0 {
		startBlockHeight = -1
	}

	txns, endBlockHeight, err := routes.walletMiddleware.TransactionHistory(routes.ctx, int32(startBlockHeight),
		walletcore.TransactionHistoryCountPerPage)
	if err != nil {
		routes.renderError(fmt.Sprintf("Error fetching history: %s", err.Error()), res)
		return
	}

	lastCount := req.FormValue("last-count")
	lastTxCount, _ := strconv.ParseInt(lastCount, 10, 32)

	data := map[string]interface{}{
		"txs":          txns,
		"startTxCount": int(lastTxCount),
		"lastTxCount":  int(lastTxCount) + len(txns),
	}

	if endBlockHeight > 0 {
		data["nextBlockHeight"] = endBlockHeight - 1
	}

	routes.render("history.html", data, res)
}

func (routes *Routes) getNextHistoryPage(res http.ResponseWriter, req *http.Request) {
	data := map[string]interface{}{}
	defer renderJSON(data, res)

	req.ParseForm()
	start := req.FormValue("start")
	startBlockHeight, err := strconv.ParseInt(start, 10, 32)
	if err != nil {
		data["success"] = false
		data["message"] = "Invalid start block parameter"
		return
	}

	txns, endBlockHeight, err := routes.walletMiddleware.TransactionHistory(routes.ctx, int32(startBlockHeight),
		walletcore.TransactionHistoryCountPerPage)
	if err != nil {
		data["success"] = false
		data["message"] = err.Error()
	} else {
		data["success"] = true
		data["txs"] = txns
		if endBlockHeight > 0 {
			data["nextBlockHeight"] = endBlockHeight - 1
		}
	}
}

func (routes *Routes) transactionDetailsPage(res http.ResponseWriter, req *http.Request) {
	hash := chi.URLParam(req, "hash")
	tx, err := routes.walletMiddleware.GetTransaction(hash)

	if err != nil {
		routes.renderError(fmt.Sprintf("Error fetching transaction: %s", err.Error()), res)
		return
	}

	data := map[string]interface{}{
		"tx": tx,
	}
	routes.render("transaction_details.html", data, res)
}

func (routes *Routes) stakingPage(res http.ResponseWriter, req *http.Request) {
	stakeInfo, err := routes.walletMiddleware.StakeInfo(routes.ctx)
	if err != nil {
		routes.renderError(fmt.Sprintf("Error fetching stake info: %s", err.Error()), res)
		return
	}

	accounts, err := routes.walletMiddleware.AccountsOverview(walletcore.DefaultRequiredConfirmations)
	if err != nil {
		routes.renderError(fmt.Sprintf("Error fetching accounts: %s", err.Error()), res)
		return
	}

	ticketPrice, err := routes.walletMiddleware.TicketPrice(routes.ctx)
	if err != nil {
		routes.renderError(fmt.Sprintf("Error fetching ticket price: %s", err.Error()), res)
		return
	}

	data := map[string]interface{}{
		"stakeinfo":   stakeInfo,
		"accounts":    accounts,
		"ticketPrice": dcrutil.Amount(ticketPrice).ToCoin(),
	}
	routes.render("staking.html", data, res)
}

func (routes *Routes) submitPurchaseTicketsForm(res http.ResponseWriter, req *http.Request) {
	data := map[string]interface{}{}
	defer renderJSON(data, res)

	req.ParseForm()
	walletPassphrase := req.FormValue("wallet-passphrase")
	numTicketsStr := req.FormValue("number-of-tickets")
	sourceAccountStr := req.FormValue("source-account")
	spendUnconfirmed := req.FormValue("spend-unconfirmed")

	numTickets, err := strconv.ParseUint(numTicketsStr, 10, 32)
	if err != nil {
		data["success"] = false
		data["message"] = err.Error()
		return
	}

	sourceAccount, err := strconv.ParseUint(sourceAccountStr, 10, 32)
	if err != nil {
		data["success"] = false
		data["message"] = err.Error()
		return
	}

	requiredConfirmations := walletcore.DefaultRequiredConfirmations
	if spendUnconfirmed != "" {
		requiredConfirmations = 0
	}

	request := dcrlibwallet.PurchaseTicketsRequest{
		RequiredConfirmations: uint32(requiredConfirmations),
		Passphrase:            []byte(walletPassphrase),
		NumTickets:            uint32(numTickets),
		Account:               uint32(sourceAccount),
	}

	ticketHashes, err := routes.walletMiddleware.PurchaseTicket(routes.ctx, request)
	if err != nil {
		data["success"] = false
		data["message"] = err.Error()
		return
	}

	if len(ticketHashes) == 0 {
		data["success"] = false
		data["message"] = "no ticket was purchased"
		return
	}

	data["success"] = true
	data["message"] = ticketHashes
}
