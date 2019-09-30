package pages

//
//import (
//	"context"
//	"errors"
//	"fmt"
//	"strconv"
//	"strings"
//
//	"github.com/raedahgroup/dcrlibwallet"
//	"github.com/raedahgroup/godcr/app/walletcore"
//	"github.com/raedahgroup/godcr/terminal/helpers"
//	"github.com/raedahgroup/godcr/terminal/primitives"
//	"github.com/rivo/tview"
//)
//
//func stakingPage(wallet walletcore.Wallet, hintTextView *primitives.TextView, setFocus func(p tview.Primitive) *tview.Application, clearFocus func()) tview.Primitive {
//	// parent flexbox layout container to hold other primitives
//	body := tview.NewFlex().SetDirection(tview.FlexRow)
//
//	body.AddItem(primitives.NewLeftAlignedTextView("Staking"), 2, 0, false)
//
//	messageTextView := primitives.WordWrappedTextView("")
//
//	clearMessage := func() {
//		body.RemoveItem(messageTextView)
//	}
//
//	displayMessage := func(message string, error bool) {
//		clearMessage()
//		messageTextView.SetText(message)
//		if error {
//			messageTextView.SetTextColor(helpers.DecredOrangeColor)
//		} else {
//			messageTextView.SetTextColor(helpers.DecredGreenColor)
//		}
//		body.AddItem(messageTextView, 2, 0, false)
//	}
//
//	stakeInfo, err := stakeInfoFlex(wallet)
//	if err != nil {
//		errorText := fmt.Sprintf("Error fetching stake info: %s", err.Error())
//		displayMessage(errorText, true)
//	} else {
//		body.AddItem(stakeInfo, 3, 0, false)
//	}
//
//	body.AddItem(tview.NewTextView().SetText("-Purchase Ticket-").SetTextColor(helpers.DecredLightBlueColor), 2, 0, false)
//	purchaseTicket, err := purchaseTicketForm(wallet, displayMessage, clearMessage, setFocus, clearFocus)
//	if err != nil {
//		errorText := fmt.Sprintf("Error setting up purchase form: %s", err.Error())
//		displayMessage(errorText, true)
//	} else {
//		body.AddItem(purchaseTicket, 0, 1, true)
//	}
//
//	setFocus(body)
//
//	hintTextView.SetText("TIP: Move around with TAB and SHIFT+TAB. ESC to return to navigation menu")
//
//	return body
//}
//
//func stakeInfoFlex(wallet walletcore.Wallet) (*primitives.TextView, error) {
//	stakeInfo, err := wallet.StakeInfo(context.Background())
//	if err != nil {
//		return nil, err
//	} else if stakeInfo == nil {
//		return nil, errors.New("no tickets in wallet")
//	}
//
//	stakingReport := fmt.Sprintf("Mempool: %d  Immature: %d  Live: %d", stakeInfo.OwnMempoolTix, stakeInfo.Immature, stakeInfo.Live)
//	return primitives.NewLeftAlignedTextView(stakingReport), nil
//}
//
//func purchaseTicketForm(wallet walletcore.Wallet, displayMessage func(message string, error bool), clearMessage func(),
//	setFocus func(p tview.Primitive) *tview.Application, clearFocus func()) (*tview.Pages, error) {
//
//	pages := tview.NewPages()
//
//	accounts, err := wallet.AccountsOverview(walletcore.DefaultRequiredConfirmations)
//	if err != nil {
//		return nil, err
//	}
//
//	form := primitives.NewForm(true)
//	form.SetBorderPadding(0, 0, 0, 0)
//	pages.AddPage("form", form, true, true)
//
//	accountSelectionWidgetData := &helpers.AccountSelectionWidgetData{
//		Label:    "From:",
//		Accounts: accounts,
//	}
//	helpers.AddAccountSelectionWidgetToForm(form, accountSelectionWidgetData)
//
//	var numTickets string
//	form.AddInputField("Number of Tickets:", "", 10, nil, func(text string) {
//		numTickets = text
//	})
//
//	var spendUnconfirmed bool
//	form.AddCheckbox("Spend Unconfirmed:", false, func(checked bool) {
//		spendUnconfirmed = checked
//	})
//
//	form.AddButton("Purchase", func() {
//		if len(numTickets) == 0 {
//			displayMessage("Error: please specify the number of tickets to purchase", true)
//			return
//		}
//
//		helpers.RequestSpendingPassphrase(pages, func(passphrase string) {
//			setFocus(form)
//
//			accountNumber := accountSelectionWidgetData.SelectedAccountNumber
//			ticketHashes, err := purchaseTickets(passphrase, numTickets, accountNumber, spendUnconfirmed, wallet)
//			if err != nil {
//				displayMessage(err.Error(), true)
//				return
//			}
//
//			successMessage := fmt.Sprintf("You have purchased %d ticket(s)\n%s", len(ticketHashes), strings.Join(ticketHashes, "\n"))
//			displayMessage(successMessage, false)
//
//			// reset form
//			form.ClearFields()
//			setFocus(form.GetFormItem(0))
//		}, func() {
//			setFocus(form)
//		})
//	})
//
//	form.AddButton("Clear", func() {
//		form.ClearFields()
//		clearMessage()
//	})
//
//	form.SetCancelFunc(clearFocus)
//
//	return pages, nil
//}
//
//func purchaseTickets(passphrase, numTickets string, accountNum uint32, spendUnconfirmed bool, wallet walletcore.Wallet) ([]string, error) {
//	nTickets, err := strconv.ParseUint(string(numTickets), 10, 32)
//	if err != nil {
//		return nil, err
//	}
//
//	requiredConfirmations := walletcore.DefaultRequiredConfirmations
//	if spendUnconfirmed {
//		requiredConfirmations = 0
//	}
//
//	request := dcrlibwallet.PurchaseTicketsRequest{
//		RequiredConfirmations: uint32(requiredConfirmations),
//		Passphrase:            []byte(passphrase),
//		NumTickets:            uint32(nTickets),
//		Account:               accountNum,
//	}
//
//	ticketHashes, err := wallet.PurchaseTicket(context.Background(), request)
//	if err != nil {
//		return nil, err
//	}
//
//	if len(ticketHashes) == 0 {
//		err = errors.New("no ticket was purchased")
//		return nil, err
//	}
//
//	return ticketHashes, nil
//}
