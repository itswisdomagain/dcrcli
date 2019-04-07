package routes

import (
	"errors"
	"fmt"
	"net/http"
	"strconv"

	"github.com/decred/dcrd/dcrutil"
	"github.com/raedahgroup/dcrlibwallet/txhelper"
	"github.com/raedahgroup/godcr/app/walletcore"
)

type sendPagePayload struct {
	utxos                 []string
	sourceAccount         uint32
	passphrase            string
	requiredConfirmations int32
	useCustom             bool
	sendDestinations      []txhelper.TransactionDestination
	totalSendAmount       int64
	changeDestinations    []txhelper.TransactionDestination
	totalInputAmount      int64
}

func retrieveSendPagePayload(req *http.Request) (payload *sendPagePayload, err error) {
	payload = new(sendPagePayload)

	req.ParseForm()
	payload.utxos = req.Form["utxo"]
	selectedAccount := req.FormValue("source-account")
	payload.passphrase = req.FormValue("wallet-passphrase")
	spendUnconfirmed := req.FormValue("spend-unconfirmed")
	payload.useCustom = req.FormValue("use-custom") != ""

	destinationAddresses := req.Form["destination-address"]
	destinationAmounts := req.Form["destination-amount"]
	sendMaxAmountChecks := req.Form["send-max-amount"]

	// sendMaxAmountChecks is a slice of send max amount true/false values
	// there are 2 `send-max-amount` input elements per destination - an hidden input field and a checkbox input field
	// the hidden input field always produces a "false" value, while the second input field produces "true" (if and only if checked)
	// no value is submitted for the second input element (the checkbox) if the checkbox is not checked
	// the implication is that for checkboxes that are checked, there'd be 2 values ("false" and "true")
	// while unchecked checkboxes will return only one value ("false")
	// if any value in the sendMaxAmountChecks slice is true, then the previous "false" value should be ignored
	// as both values refer to the same destination
	// at the end of the day, the number of send max amount check values should be equal to the number of destination address values
	actualSendMaxAmountValues := make([]string, 0, len(destinationAddresses))
	for _, sendMaxAmountCheckValue := range sendMaxAmountChecks {
		if sendMaxAmountCheckValue == "true" {
			// replace previous value in `actualSendMaxAmountValues` slice to true and ignore the previously set value
			previousValueIndex := len(actualSendMaxAmountValues) - 1
			actualSendMaxAmountValues[previousValueIndex] = sendMaxAmountCheckValue
		} else {
			actualSendMaxAmountValues = append(actualSendMaxAmountValues, sendMaxAmountCheckValue)
		}
	}

	account, err := strconv.ParseUint(selectedAccount, 10, 32)
	if err != nil {
		return nil, errors.New("invalid source account selected")
	}
	payload.sourceAccount = uint32(account)

	sendDestinations, err := walletcore.BuildTxDestinations(destinationAddresses, destinationAmounts, actualSendMaxAmountValues)
	if err != nil {
		return nil, err
	}
	payload.sendDestinations = sendDestinations

	payload.requiredConfirmations = walletcore.DefaultRequiredConfirmations
	if spendUnconfirmed != "" {
		payload.requiredConfirmations = 0
	}

	totalSelectedInputAmountDcr := req.FormValue("totalSelectedInputAmountDcr")
	totalInputAmountDcr, err := strconv.ParseFloat(totalSelectedInputAmountDcr, 64)
	if err != nil {
		return nil, errors.New("cannot read total send amount value")
	}

	totalInputAmount, err := dcrutil.NewAmount(totalInputAmountDcr)
	if err != nil {
		err = errors.New("cannot read total send amount value")
		return
	}

	payload.totalInputAmount = int64(totalInputAmount)

	changeOutputAddresses := req.Form["change-output-address"]
	changeOutputAmounts := req.Form["change-output-amount"]

	changeDestinations, err := walletcore.BuildTxDestinations(changeOutputAddresses, changeOutputAmounts, []string{})
	if err != nil {
		return nil, fmt.Errorf("error in building change destinations: %s", err.Error())
	}
	payload.changeDestinations = changeDestinations

	return
}
