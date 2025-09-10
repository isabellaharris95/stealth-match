import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WalletTest = () => {
  const { address, isConnected, connector } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Wallet Connection Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <strong>Status:</strong> {isConnected ? 'Connected' : 'Disconnected'}
        </div>
        
        {isConnected && (
          <>
            <div>
              <strong>Address:</strong> {address}
            </div>
            <div>
              <strong>Connector:</strong> {connector?.name}
            </div>
            <Button onClick={() => disconnect()} variant="destructive">
              Disconnect
            </Button>
          </>
        )}
        
        {!isConnected && (
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              Available connectors:
            </div>
            {connectors.map((connector) => (
              <Button
                key={connector.uid}
                onClick={() => connect({ connector })}
                variant="outline"
                className="w-full"
              >
                Connect {connector.name}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WalletTest;
