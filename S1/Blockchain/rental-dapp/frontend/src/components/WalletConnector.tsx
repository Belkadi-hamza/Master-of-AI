import { motion } from "framer-motion";
import { Wallet, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WalletConnectorProps {
  account: string | null;
  onConnect: () => void;
  connecting: boolean;
}

const WalletConnector = ({ account, onConnect, connecting }: WalletConnectorProps) => {
  const truncate = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  if (account) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 glow-border"
      >
        <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
        <span className="font-mono text-sm text-primary">{truncate(account)}</span>
        <a
          href={`https://etherscan.io/address/${account}`}
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </motion.div>
    );
  }

  return (
    <Button
      onClick={onConnect}
      disabled={connecting}
      className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-semibold"
    >
      {connecting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Wallet className="h-4 w-4" />
      )}
      {connecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
};

export default WalletConnector;
