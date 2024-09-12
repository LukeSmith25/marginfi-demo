import { Connection } from "@solana/web3.js";
import { MarginfiClient, getConfig } from '@mrgnlabs/marginfi-client-v2';
import { NodeWallet } from "@mrgnlabs/mrgn-common";
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create the Solana connection and Marginfi client setup
const connection = new Connection(process.env.RPC_URL || "", "confirmed");
const wallet = NodeWallet.local();
const config = getConfig("dev");

const main = async () => {
  try {
    // Initialize MarginfiClient
    const client = await MarginfiClient.fetch(config, wallet, connection);
    console.log("Marginfi client initialized.");

    // Step 1: Create a new Marginfi account
    const marginfiAccount = await client.createMarginfiAccount();
    const accountAddress = marginfiAccount.address;
    console.log(`Created Marginfi Account: ${accountAddress.toBase58()}`);

    // Step 2: Fetch all Marginfi accounts for the wallet authority
    const accounts = await client.getMarginfiAccountsForAuthority(wallet.publicKey);
    if (!accounts.length) throw new Error("No Marginfi accounts found for this wallet.");
    console.log('Fetched Marginfi Accounts:', accounts);

    // Step 3: Fetch the SOL bank information
    const bankLabel = "SOL";
    const bank = await client.getBankByTokenSymbol(bankLabel);
    if (!bank) throw new Error(`${bankLabel} bank not found.`);
    console.log(`Fetched Bank: ${bank.address}`);

    // Step 4: Deposit 1 SOL into the bank
    const depositAmount = 1;
    await marginfiAccount.deposit(depositAmount, bank.address);
    console.log(`Deposited ${depositAmount} SOL into ${bankLabel} bank`);

    // Step 5: Borrow 1 SOL from the bank
    const borrowAmount = 1;
    await marginfiAccount.borrow(borrowAmount, bank.address);
    console.log(`Borrowed ${borrowAmount} SOL from ${bankLabel} bank`);

    // Step 6: Optional - Check balance or reload account to reflect changes
    await marginfiAccount.reload();
    console.log("Account balances reloaded after actions.");

  } catch (error) {
    console.error("An error occurred:", error);
  }
};

main().catch((err) => console.error("Failed to run the demo:", err));
