# Marginfi Account Demo

Welcome to the **Marginfi Account Demo** repository! This project demonstrates how to interact with the Marginfi protocol on Solana using the official Marginfi TypeScript SDK. You will learn how to create Marginfi accounts, fetch accounts tied to your wallet, check balances, and borrow funds using the SDK.

## Table of Contents

1. [Project Setup](#project-setup)
2. [Installation](#installation)
3. [Scripts](#scripts)
4. [Environment Variables](#environment-variables)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)

---

## Project Setup

This project is set up with TypeScript and uses **ts-node** for running TypeScript directly. It also integrates the Marginfi TypeScript SDK and Solana's web3.js library for on-chain operations.

The project structure is as follows:

```bash
/marginfi-demo
  /src
    marginfi-account-demo.ts   # Main demo file
  .env.example                 # Example env file for setting up RPC and wallet
  README.md                    # Project readme
  package.json                 # Project dependencies and scripts
  tsconfig.json                # TypeScript configuration
  yarn.lock                    # Yarn lock file
```

## Installation

### 1. Prerequisites

- Node.js (v16.x or later)
- Yarn (v1.22.x or later)
- Solana CLI installed (follow instructions [here](https://docs.solana.com/cli/install-solana-cli-tools))
- A Solana wallet (run `solana-keygen new` to create one if needed)

### 2. Clone the repository:

```bash
git clone https://github.com/LukeSmith25/marginfi-demo.git
cd marginfi-demo
```

### 3. Install dependencies:

Make sure to have Yarn installed and run the following command:

```bash
yarn install
```

### 4. Set up environment variables:

Copy the `.env.example` file and rename it to `.env`. Inside the `.env` file, update the following variables with your values:

```
RPC_URL=https://api.devnet.solana.com
WALLET_PATH=~/.config/solana/id.json  # Path to your Solana wallet keypair file
```

## Scripts

The following scripts are defined in the `package.json`:

- **`yarn start`**: Runs the Marginfi account demo.
- **`yarn build`**: Compiles the TypeScript code into JavaScript in the `dist` folder.
- **`yarn ts-node <file>`**: Runs a TypeScript file with `ts-node`.

### Run the demo:

```bash
yarn start
```

## Environment Variables

To connect to Solana's devnet or testnet, you'll need to define your RPC URL and provide the path to your local Solana wallet keypair.

Here’s what each environment variable means:

- **RPC_URL**: The URL of the Solana cluster you’re connecting to. (Defaults to `https://api.devnet.solana.com`)
- **WALLET_PATH**: The file path to your Solana wallet keypair (generated using `solana-keygen`).

## Usage

Once your environment is set up, you can run the demo to create Marginfi accounts, fetch them, check balances, and borrow funds.

Here’s a quick example of what happens:

1. **Initialize Marginfi Client**: The client is created using your wallet and RPC connection.
2. **Create a Marginfi Account**: A new account is generated.
3. **Fetch Accounts**: All accounts tied to your wallet are retrieved.
4. **Check Balances**: Solana balance for the accounts is displayed.
5. **Borrow Funds**: An amount of SOL is borrowed from Marginfi's liquidity pool.

---

## Contributing

Feel free to open issues or submit pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.