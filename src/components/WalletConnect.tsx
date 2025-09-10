import { Button } from "@/components/ui/button";
import { Wallet, Check, Copy, ExternalLink, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { formatEther } from 'viem';
import { useState } from 'react';

const WalletConnect = () => {
  const { address, isConnected, connector } = useAccount();
  const { connect, connectors, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address: address,
  });
  const [showConnectors, setShowConnectors] = useState(false);

  const handleConnect = (connector: any) => {
    try {
      connect({ connector });
      setShowConnectors(false);
    } catch (err) {
      console.error('Connection error:', err);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getConnectorName = (connector: any) => {
    const name = connector.name.toLowerCase();
    if (name.includes('metamask')) return 'MetaMask';
    if (name.includes('coinbase')) return 'Coinbase Wallet';
    if (name.includes('walletconnect')) return 'WalletConnect';
    if (name.includes('injected')) {
      // Try to detect specific injected wallets
      if (window.ethereum?.isMetaMask) return 'MetaMask';
      if (window.ethereum?.isCoinbaseWallet) return 'Coinbase Wallet';
      if (window.ethereum?.isRabby) return 'Rabby';
      if (window.ethereum?.isBraveWallet) return 'Brave Wallet';
      if (window.ethereum?.isPhantom) return 'Phantom';
      if (window.ethereum?.isTrust) return 'Trust Wallet';
      if (window.ethereum?.isTokenPocket) return 'TokenPocket';
      if (window.ethereum?.isOkxWallet) return 'OKX Wallet';
      if (window.ethereum?.isBitgetWallet) return 'Bitget Wallet';
      if (window.ethereum?.isRainbow) return 'Rainbow';
      if (window.ethereum?.isZerion) return 'Zerion';
      if (window.ethereum?.isFrame) return 'Frame';
      if (window.ethereum?.isFrontier) return 'Frontier';
      if (window.ethereum?.isTokenary) return 'Tokenary';
      if (window.ethereum?.isOneInch) return '1inch Wallet';
      if (window.ethereum?.isEnjin) return 'Enjin Wallet';
      if (window.ethereum?.isExodus) return 'Exodus';
      if (window.ethereum?.isXdefi) return 'XDEFI';
      if (window.ethereum?.isGamestop) return 'GameStop Wallet';
      if (window.ethereum?.isCypher) return 'Cypher Wallet';
      if (window.ethereum?.isBitkeep) return 'BitKeep';
      if (window.ethereum?.isSequence) return 'Sequence';
      if (window.ethereum?.isCore) return 'Core';
      if (window.ethereum?.isOmni) return 'Omni';
      if (window.ethereum?.isBifrost) return 'Bifrost';
      return 'Browser Wallet';
    }
    return connector.name;
  };

  const isWalletAvailable = (connector: any) => {
    if (connector.name.toLowerCase().includes('injected')) {
      return !!window.ethereum;
    }
    return true;
  };

  const handleDisconnect = () => {
    disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard.",
      });
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (!isConnected) {
    return (
      <DropdownMenu open={showConnectors} onOpenChange={setShowConnectors}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 hover:from-blue-500/20 hover:to-purple-500/20"
            disabled={isPending}
          >
            <Wallet className="h-4 w-4 mr-2" />
            {isPending ? "Connecting..." : "Connect Wallet"}
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Choose Wallet</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {connectors.filter(isWalletAvailable).map((connector) => (
            <DropdownMenuItem
              key={connector.uid}
              onClick={() => handleConnect(connector)}
              className="cursor-pointer"
            >
              <Wallet className="h-4 w-4 mr-2" />
              {getConnectorName(connector)}
            </DropdownMenuItem>
          ))}
          {connectors.filter(isWalletAvailable).length === 0 && (
            <DropdownMenuItem disabled className="text-muted-foreground">
              No wallets detected
            </DropdownMenuItem>
          )}
          {error && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled className="text-red-500">
                Error: {error.message}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="bg-green-500/10 border-green-500/20 hover:bg-green-500/20">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              <Wallet className="h-4 w-4" />
            </div>
            <span className="font-mono text-xs">{address ? formatAddress(address) : ''}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center space-x-2">
          <Check className="h-4 w-4 text-green-500" />
          <span>Wallet Connected</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={copyAddress} className="cursor-pointer">
          <Copy className="h-4 w-4 mr-2" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Wallet className="h-4 w-4 mr-2" />
          Balance: {balance ? `${parseFloat(formatEther(balance.value)).toFixed(4)} ${balance.symbol}` : 'Loading...'}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => window.open(`https://sepolia.etherscan.io/address/${address}`, '_blank')}
          className="cursor-pointer"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View on Etherscan
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDisconnect} className="cursor-pointer text-red-500">
          Disconnect Wallet
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletConnect;