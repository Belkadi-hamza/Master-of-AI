import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Dashboard from "@/components/Dashboard";
import { connectWallet } from "@/services/contract";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnect = useCallback(async () => {
    setConnecting(true);
    try {
      const addr = await connectWallet();
      setAccount(addr);
      toast({ title: "Wallet Connected", description: `${addr.slice(0, 6)}...${addr.slice(-4)}` });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to connect";
      toast({ title: "Connection Failed", description: msg, variant: "destructive" });
    } finally {
      setConnecting(false);
    }
  }, [toast]);

  return (
    <div className="min-h-screen bg-background grid-bg">
      <Navbar account={account} onConnect={handleConnect} connecting={connecting} />
      <Dashboard account={account} />
    </div>
  );
};

export default Index;
