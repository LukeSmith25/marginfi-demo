import { Connection } from "@solana/web3.js";
import { MarginfiClient, getConfig } from '@mrgnlabs/marginfi-client-v2';
import { NodeWallet } from "@mrgnlabs/mrgn-common";
import * as dotenv from 'dotenv';

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
    const accountAddress = marginfiAccount.address; // Use 'address' instead of 'publicKey'
    console.log(`Created Marginfi Account: ${accountAddress.toBase58()}`);

    // Step 2: Fetch Marginfi accounts for the wallet authority
    const accounts = await client.getMarginfiAccountsForAuthority(wallet.publicKey);
    console.log('Fetched Marginfi Accounts:', accounts);

    // Step 3: Fetch the SOL bank information
    const bankLabel = "SOL";
    const bank = client.getBankByTokenSymbol(bankLabel);
    if (!bank) throw new Error(`${bankLabel} bank not found`);
    console.log(`Fetched Bank: ${bank.address}`);

    // Step 4: Deposit 1 SOL into the bank
    await marginfiAccount.deposit(1, bank.address);
    console.log(`Deposited 1 SOL into ${bankLabel} bank`);

    // Step 5: Borrow 1 SOL from the bank
    await marginfiAccount.borrow(1, bank.address);
    console.log(`Borrowed 1 SOL from ${bankLabel} bank`);

  } catch (error) {
    console.error("An error occurred:", error);
  }
};

main().catch((err) => console.error("Failed to run the demo:", err));
