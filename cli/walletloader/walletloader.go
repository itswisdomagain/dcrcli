package walletloader

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/raedahgroup/dcrlibwallet/defaultsynclistener"
	"github.com/raedahgroup/godcr/app"
	"github.com/raedahgroup/godcr/app/config"
	"github.com/raedahgroup/godcr/cli/termio/terminalprompt"
)

// CreateWallet creates a new wallet if one doesn't already exist using the WalletMiddleware provided
func CreateWallet(ctx context.Context) (*config.WalletInfo, error) {
	walletMiddleware, err := choseNetworkAndCreateMiddleware(ctx)
	if err != nil {
		return nil, err
	}

	// check if wallet already exists for selected network type
	walletExists, err := walletMiddleware.WalletExists()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error checking %s wallet: %s\n", walletMiddleware.NetType(), err.Error())
		return nil, err
	}
	if walletExists {
		netType := strings.Title(walletMiddleware.NetType())
		fmt.Fprintf(os.Stderr, "%s wallet already exists\n", netType)
		return nil, fmt.Errorf("wallet already exists")
	}

	// ask user to enter passphrase twice
	passphrase, err := terminalprompt.RequestInputSecure("Enter private passphrase for new wallet", terminalprompt.EmptyValidator)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error reading input: %s\n", err.Error())
		return nil, err
	}
	confirmPassphrase, err := terminalprompt.RequestInputSecure("Confirm passphrase", terminalprompt.EmptyValidator)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error reading input: %s\n", err.Error())
		return nil, err
	}
	if passphrase != confirmPassphrase {
		fmt.Fprintln(os.Stderr, "Passphrases do not match")
		return nil, fmt.Errorf("passphrases do not match")
	}

	// get seed and display to user
	seed, err := walletMiddleware.GenerateNewWalletSeed()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error generating seed for new wallet: %s\n", err)
		return nil, err
	}
	displayWalletSeed(seed)

	// ask user to back seed up, only proceed after user does so
	backupPrompt := `Enter "OK" to continue. This assumes you have stored the seed in a safe and secure location`
	backupValidator := func(userResponse string) error {
		userResponse = strings.TrimSpace(userResponse)
		userResponse = strings.Trim(userResponse, `"`)
		if strings.EqualFold("OK", userResponse) {
			return nil
		} else {
			return fmt.Errorf("invalid response, try again")
		}
	}
	_, err = terminalprompt.RequestInput(backupPrompt, backupValidator)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error reading input: %s\n", err.Error())
		return nil, err
	}

	// user entered "OK" in last prompt, finalize wallet creation
	err = walletMiddleware.CreateWallet(passphrase, seed)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error creating wallet: %s\n", err.Error())
		return nil, err
	}
	fmt.Printf("Decred %s wallet created successfully\n", walletMiddleware.NetType())

	// close wallet after other ops are done so that a block will not be experienced
	// when a subsequent attempt to reopen the wallet is made in order to execute a command
	defer walletMiddleware.CloseWallet()

	walletInfo := &config.WalletInfo{
		Network: walletMiddleware.NetType(),
		Source:  "godcr",
		DbDir:   filepath.Join(config.DefaultAppDataDir, walletMiddleware.NetType()),
	}

	// sync blockchain?
	syncBlockchainPrompt := "Would you like to sync the blockchain now?"
	syncBlockchain, err := terminalprompt.RequestYesNoConfirmation(syncBlockchainPrompt, "Y")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error reading your response: %s\n", err.Error())
		return walletInfo, err
	}

	if !syncBlockchain {
		return walletInfo, nil
	}

	return walletInfo, SyncBlockChain(ctx, walletMiddleware)
}

// syncBlockChain uses the WalletMiddleware provided to download block updates
// this is a long running operation, listen for ctx.Done and stop processing
func SyncBlockChain(ctx context.Context, walletMiddleware app.WalletMiddleware) error {
	syncError := make(chan error)
	var syncDone bool

	processSyncUpdates := func(report *defaultsynclistener.ProgressReport) {
		if syncDone {
			return
		}

		progressReport := report.Read()

		if progressReport.Done {
			syncDone = true
			if progressReport.Error == "" {
				fmt.Println("Synced successfully.")
				syncError <- nil
			} else {
				fmt.Fprintf(os.Stderr, "Sync completed with error: %s.\n", progressReport.Error)
				syncError <- fmt.Errorf(progressReport.Error)
			}
			return
		}
	}

	fmt.Println("Sync started.")
	walletMiddleware.SyncBlockChain(true, processSyncUpdates)

	// wait for context cancel or sync done trigger before exiting function
	select {
	case <-ctx.Done():
		return ctx.Err()
	case err := <-syncError:
		return err
	}
}
