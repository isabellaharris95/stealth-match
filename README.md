# Stealth Match - FHE-Powered Job Matching Platform

A privacy-preserving job matching platform that uses Fully Homomorphic Encryption (FHE) to protect sensitive candidate and employer data while enabling accurate matching algorithms.

## Features

- **FHE Encryption**: All sensitive data (salaries, experience levels, skills) is encrypted using Fully Homomorphic Encryption
- **Privacy-Preserving Matching**: Candidates and jobs are matched without exposing sensitive information
- **Blockchain Integration**: Smart contracts on Sepolia testnet for transparent and verifiable operations
- **Wallet Integration**: MetaMask and WalletConnect support for secure transactions
- **Real-time Updates**: Live transaction status and confirmation tracking

## Technology Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Blockchain**: Solidity, Hardhat, FHEVM
- **Wallet**: Wagmi, Viem, MetaMask, WalletConnect
- **Encryption**: Zama FHE Library
- **Network**: Sepolia Testnet

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MetaMask or compatible wallet
- Sepolia ETH for gas fees

### Installation

```bash
# Clone the repository
git clone https://github.com/isabellaharris95/stealth-match.git

# Navigate to the project directory
cd stealth-match

# Install dependencies
npm install

# Set up environment variables
cp env.example .env
# Edit .env with your configuration

# Compile smart contracts
npm run compile

# Deploy contracts (optional - for local development)
npm run deploy:local
```

### Environment Variables

Create a `.env` file with the following variables:

```env
# WalletConnect Project ID
VITE_WALLETCONNECT_PROJECT_ID=your-project-id

# Hardhat Configuration
PRIVATE_KEY=your-private-key
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/your-infura-key
ETHERSCAN_API_KEY=your-etherscan-api-key

# Contract Addresses (will be filled after deployment)
VITE_CONTRACT_ADDRESS=
```

### Development

```bash
# Start the development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Smart Contract Deployment

### Deploy to Sepolia Testnet

```bash
# Deploy to Sepolia
npm run deploy:sepolia

# Verify contract on Etherscan
npm run verify
```

### Contract Functions

- `postJob()`: Create a new job posting with encrypted details
- `createProfile()`: Create a candidate profile with encrypted information
- `applyForJob()`: Submit an application with encrypted match score
- `findMatches()`: Find compatible matches using FHE operations
- `verifyJob()` / `verifyProfile()`: Verify job postings and candidate profiles

## Usage

### For Employers

1. Connect your wallet
2. Navigate to "Post Job"
3. Fill in job details (title, description, company, location)
4. Set encrypted salary and experience requirements
5. Submit the job posting to the blockchain

### For Candidates

1. Connect your wallet
2. Navigate to "Find Candidates" (for profile creation)
3. Create a profile with encrypted salary expectations and experience
4. Browse available jobs
5. Apply for positions with encrypted match scores

## FHE Implementation

The platform uses Zama's FHE library to encrypt sensitive data:

- **Salary Information**: Encrypted using `euint32` for homomorphic operations
- **Experience Levels**: Encrypted for privacy-preserving matching
- **Skill Scores**: Encrypted for accurate candidate assessment
- **Match Scores**: Computed on encrypted data without decryption

## Security Features

- **Zero-Knowledge Matching**: Sensitive data never leaves the encrypted state
- **GDPR Compliance**: Full compliance with data protection regulations
- **Transparent Operations**: All operations are verifiable on the blockchain
- **Reputation System**: Encrypted reputation scores for employers and candidates

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team

## Acknowledgments

- Zama for FHE technology
- Hardhat for smart contract development
- Wagmi for wallet integration
- shadcn/ui for UI components
