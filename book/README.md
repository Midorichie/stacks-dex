# Stacks DEX (Automated Market Maker)

## Overview
A decentralized exchange implementation on the Stacks blockchain using the Clarity smart contract language. This AMM enables trustless token swaps using an automated market maker model.

## Project Structure
```
stacks-dex/
├── contracts/
│   ├── dex.clar           # Main DEX contract
│   ├── liquidity-token.clar    # LP token contract
│   └── traits/
│       └── sip-010-trait.clar  # SIP-010 fungible token trait
├── tests/
│   ├── dex_test.ts
│   └── helper.ts
├── .gitignore
├── Clarinet.toml
└── README.md
```

## Prerequisites
- [Clarinet](https://github.com/hirosystems/clarinet)
- Node.js v14 or higher
- Git

## Setup Instructions
1. Clone the repository
```bash
git clone <repository-url>
cd stacks-dex
```

2. Initialize Clarinet project
```bash
clarinet new stacks-dex
```

3. Install dependencies
```bash
npm install
```

## Smart Contract Architecture

### DEX Contract (`contracts/dex.clar`)
- Implements core AMM functionality
- Constant product formula (x * y = k)
- Functions for:
  - Adding liquidity
  - Removing liquidity
  - Token swaps
  - Price calculations

### Liquidity Token Contract (`contracts/liquidity-token.clar`)
- SIP-010 compliant fungible token
- Represents liquidity provider shares
- Minted/burned based on liquidity operations

## Testing
Run tests using Clarinet:
```bash
clarinet test
```

## Security Considerations
- Integer overflow protection
- Reentrancy prevention
- Access control mechanisms
- Slippage protection

## License
MIT
