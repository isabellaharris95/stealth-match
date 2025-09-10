import { createConfig, http } from 'wagmi'
import { sepolia, mainnet } from 'wagmi/chains'
import { injected, metaMask, walletConnect, coinbaseWallet } from 'wagmi/connectors'

// Get projectId from https://cloud.walletconnect.com
export const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'your-project-id'

// Create wagmi config
export const config = createConfig({
  chains: [sepolia, mainnet],
  connectors: [
    // Generic injected connector for all browser wallets
    injected(),
    // Specific wallet connectors
    metaMask(),
    coinbaseWallet({
      appName: 'Stealth Match',
      appLogoUrl: 'https://stealth-match.vercel.app/icon.svg',
    }),
    walletConnect({ 
      projectId,
      metadata: {
        name: 'Stealth Match',
        description: 'FHE-Powered Job Matching Platform',
        url: 'https://stealth-match.vercel.app',
        icons: ['https://stealth-match.vercel.app/icon.svg']
      }
    }),
  ],
  transports: {
    [sepolia.id]: http(),
    [mainnet.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
