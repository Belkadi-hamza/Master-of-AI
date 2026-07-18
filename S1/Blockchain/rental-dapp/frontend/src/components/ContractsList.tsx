import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Loader, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getLandlordContracts, getTenantContracts } from "@/services/contract";

interface ContractsListProps {
  account: string | null;
  onSelectContract: (id: number) => void;
  selectedContractId: number;
  refreshTrigger?: number;
}

const ContractsList = ({
  account,
  onSelectContract,
  selectedContractId,
  refreshTrigger = 0,
}: ContractsListProps) => {
  const [contractIds, setContractIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<"landlord" | "tenant" | null>(null);

  useEffect(() => {
    const fetchContracts = async () => {
      if (!account) return;

      setLoading(true);
      setError(null);

      try {
        // Try to get as landlord first, then as tenant
        try {
          const landlordContracts = await getLandlordContracts(account);
          if (landlordContracts.length > 0) {
            setContractIds(landlordContracts);
            setUserRole("landlord");
          } else {
            const tenantContracts = await getTenantContracts(account);
            setContractIds(tenantContracts);
            setUserRole("tenant");
          }
        } catch {
          // If landlord fetch fails, try tenant
          const tenantContracts = await getTenantContracts(account);
          setContractIds(tenantContracts);
          setUserRole("tenant");
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Failed to fetch contracts";
        setError(errorMsg);
        setContractIds([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, [account, refreshTrigger]);

  if (!account) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Please connect your wallet to view contracts</AlertDescription>
      </Alert>
    );
  }

  if (loading) {
    return (
      <div className="glass-card p-6 flex items-center justify-center gap-2">
        <Loader className="h-4 w-4 animate-spin text-primary" />
        <span className="text-sm text-muted-foreground">Loading contracts...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (contractIds.length === 0) {
    return (
      <Alert>
        <FileText className="h-4 w-4" />
        <AlertDescription>
          No contracts found. {userRole === "landlord" ? "Create a new one" : "Your landlord needs to create one for you"}.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.05 }}
      className="glass-card p-6 space-y-4"
    >
      <div>
        <h3 className="text-lg font-semibold text-foreground">
          {userRole === "landlord" ? "My Rental Agreements (Landlord)" : "My Leases (Tenant)"}
        </h3>
        <p className="text-sm text-muted-foreground">Found {contractIds.length} contract(s)</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {contractIds.map((id) => (
          <motion.button
            key={id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectContract(id)}
            className={`p-4 rounded-lg transition-all border-2 ${
              selectedContractId === id
                ? "border-primary bg-primary/10 text-primary font-semibold"
                : "border-transparent bg-secondary/50 hover:bg-secondary/80 text-foreground"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="text-sm">Contract #{id}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default ContractsList;
