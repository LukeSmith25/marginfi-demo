import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { MarginfiClient, getConfig } from '@mrgnlabs/marginfi-client-v2';
import { NodeWallet } from "@mrgnlabs/mrgn-common";
import * as dotenv from 'dotenv';

dotenv.config();

const connection = new Connection(process.env.RPC_URL || "", "confirmed");
const wallet = NodeWallet.local();  // Ensure your local wallet is correctly configured
const config = getConfig("dev");

const airdropSolToWallet = async (wallet: PublicKey, amount: number) => {
    try {
        console.log(`Requesting airdrop of ${amount} SOL to wallet ${wallet.toBase58()}`);

        const signature = await connection.requestAirdrop(wallet, amount * LAMPORTS_PER_SOL);
        const latestBlockhash = await connection.getLatestBlockhash();

        // Confirm the transaction using the new method with a transaction confirmation strategy
        await connection.confirmTransaction({
            signature: signature,
            blockhash: latestBlockhash.blockhash,
            lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        });

        console.log(`Airdrop transaction complete: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    } catch (error) {
        console.error('Failed to airdrop SOL:', error);
    }
};

const main = async () => {
    try {
        // Airdrop 2 SOL to the wallet if necessary
        // await airdropSolToWallet(wallet.publicKey, 2);

        // Initialize MarginfiClient
        const client = await MarginfiClient.fetch(config, wallet, connection);
        console.log("Marginfi client initialized.");

        // Step 1: Create a new Marginfi account
        const marginfiAccount = await client.createMarginfiAccount();
        const accountAddress = marginfiAccount.address;
        console.log(`Created Marginfi Account: ${accountAddress.toBase58()}`);

        // Step 2: Fetch Marginfi accounts for the wallet authority
        const accounts = await client.getMarginfiAccountsForAuthority(wallet.publicKey);
        console.log('Fetched Marginfi Accounts:', accounts);

        // Step 3: Fetch the SOL bank information
        const bankLabel = "SOL";
        const bank = await client.getBankByTokenSymbol(bankLabel);
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
