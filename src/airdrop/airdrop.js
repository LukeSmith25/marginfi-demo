const SOLANA = require('@solana/web3.js');
const { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } = SOLANA;

const SOLANA_CONNECTION = new Connection(clusterApiUrl('devnet'));  // Use devnet
const WALLET_ADDRESS = 'YOUR_PHANTOM_WALLET_ADDRESS';  // Replace with your Phantom wallet address
const AIRDROP_AMOUNT = 1 * LAMPORTS_PER_SOL;  // Requesting 1 SOL

(async () => {
    try {
        console.log(`Requesting airdrop for ${WALLET_ADDRESS}`);
        const signature = await SOLANA_CONNECTION.requestAirdrop(
            new PublicKey(WALLET_ADDRESS),
            AIRDROP_AMOUNT
        );
        console.log(`Tx Complete: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    } catch (error) {
        console.error("Error during airdrop:", error);
    }
})();
