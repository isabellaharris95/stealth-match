# Deployment Guide

## Prerequisites

1. **Node.js** (v18 or higher)
2. **MetaMask** or compatible wallet
3. **Sepolia ETH** for gas fees
4. **Infura/Alchemy** account for RPC endpoint

## Environment Setup

1. Copy `env.example` to `.env`
2. Fill in the required environment variables:

```env
# WalletConnect Project ID (get from https://cloud.walletconnect.com)
VITE_WALLETCONNECT_PROJECT_ID=your-project-id

# Hardhat Configuration
PRIVATE_KEY=your-private-key
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/your-infura-key
ETHERSCAN_API_KEY=your-etherscan-api-key

# Contract Addresses (will be filled after deployment)
VITE_CONTRACT_ADDRESS=
```

## Smart Contract Deployment

### 1. Install Dependencies

```bash
npm install
```

### 2. Compile Contracts

```bash
npm run compile
```

### 3. Deploy to Sepolia

```bash
npm run deploy:sepolia
```

### 4. Update Environment Variables

After deployment, update your `.env` file with the deployed contract address:

```env
VITE_CONTRACT_ADDRESS=0xYourDeployedContractAddress
```

### 5. Verify Contract (Optional)

```bash
npm run verify
```

## Frontend Deployment

### Vercel Deployment

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set environment variables in Vercel dashboard

2. **Environment Variables in Vercel**:
   - `VITE_WALLETCONNECT_PROJECT_ID`
   - `VITE_CONTRACT_ADDRESS`

3. **Deploy**:
   - Vercel will automatically deploy on push to main branch
   - Or manually trigger deployment from dashboard

### Manual Build

```bash
# Build for production
npm run build

# Preview build locally
npm run preview
```

## Testing

### Run Tests

```bash
npm test
```

### Local Development

```bash
npm run dev
```

## Post-Deployment Checklist

- [ ] Contract deployed to Sepolia
- [ ] Contract address updated in environment variables
- [ ] Frontend deployed to Vercel
- [ ] Wallet connection working
- [ ] Job posting functionality tested
- [ ] Profile creation functionality tested
- [ ] FHE operations working correctly

## Troubleshooting

### Common Issues

1. **"Contract not found"**: Ensure contract address is correctly set in environment variables
2. **"Insufficient funds"**: Make sure you have Sepolia ETH for gas fees
3. **"Wallet not connected"**: Check MetaMask connection and network (Sepolia)
4. **"Transaction failed"**: Check gas limits and network congestion

### Support

For issues and questions:
- Check the GitHub repository issues
- Review the smart contract logs
- Verify environment configuration
