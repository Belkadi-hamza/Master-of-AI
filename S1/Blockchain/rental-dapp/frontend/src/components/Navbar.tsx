import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import WalletConnector from "./WalletConnector";

interface NavbarProps {
  account: string | null;
  onConnect: () => void;
  connecting: boolean;
}

const Navbar = ({ account, onConnect, connecting }: NavbarProps) => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 glass-card border-b border-border/50 rounded-none"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 glow-border">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">RentChain</h1>
            <p className="text-xs text-muted-foreground">Smart Rental Protocol</p>
          </div>
        </div>
        <WalletConnector account={account} onConnect={onConnect} connecting={connecting} />
      </div>
    </motion.nav>
  );
};

export default Navbar;
