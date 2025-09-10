interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    isCoinbaseWallet?: boolean;
    isRabby?: boolean;
    isBraveWallet?: boolean;
    isPhantom?: boolean;
    isTrust?: boolean;
    isTokenPocket?: boolean;
    isOkxWallet?: boolean;
    isBitgetWallet?: boolean;
    isRainbow?: boolean;
    isZerion?: boolean;
    isFrame?: boolean;
    isFrontier?: boolean;
    isTokenary?: boolean;
    isOneInch?: boolean;
    isEnjin?: boolean;
    isExodus?: boolean;
    isXdefi?: boolean;
    isGamestop?: boolean;
    isCypher?: boolean;
    isBitkeep?: boolean;
    isSequence?: boolean;
    isCore?: boolean;
    isOmni?: boolean;
    isBifrost?: boolean;
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on: (event: string, callback: (...args: any[]) => void) => void;
    removeListener: (event: string, callback: (...args: any[]) => void) => void;
  };
}
