import { Connection } from "@solana/web3.js";
import { MarginfiClient, getConfig } from "@mrgnlabs/marginfi-client-v2";
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

        // Step 1: Fetch a specific bank by its symbol
        const bankLabel = "SOL"; // Replace with any token symbol like USDC, etc.
        console.log(`Fetching the ${bankLabel} bank...`);
        const bank = await client.getBankByTokenSymbol(bankLabel);
        if (!bank) throw new Error(`${bankLabel} bank not found`);
        console.log(`Fetched ${bankLabel} bank details: `, bank);

        // Explanation: Isolated banks vs. Main liquidity pool
        console.log(`
            - Isolated banks contain risk within specific assets and cannot be borrowed against. 
            They are designed for more volatile assets.
            - Main liquidity pools allow borrowing against assets and are used for safer, more stable assets.
        `);

        // Step 2: Fetch multiple banks by symbols
        const bankSymbols = ["SOL", "USDC"]; // Add more symbols as needed
        console.log("Fetching multiple banks:", bankSymbols.join(", "));
        const banks = await Promise.all(
            bankSymbols.map((symbol) => client.getBankByTokenSymbol(symbol))
        );
        console.log("Fetched multiple banks:", banks);

        // Step 3: Log key properties of the Bank objects
        banks.forEach((bank, idx) => {
            console.log(`
                Bank ${bankSymbols[idx]} details:
                - Total Asset Shares: ${bank?.totalAssetShares?.toString() || "N/A"}
                - Emissions Remaining: ${bank?.emissionsRemaining?.toString() || "N/A"}
              `);
            });

    } catch (error) {
        console.error("An error occurred:", error);
    }
};

main().catch((err) => console.error("Failed to run the demo:", err));
