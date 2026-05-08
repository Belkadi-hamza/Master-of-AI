import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Plus } from "lucide-react";
import ContractInfoCard from "./ContractInfoCard";
import ActionPanel from "./ActionPanel";
import ContractsList from "./ContractsList";
import CreateContractForm from "./CreateContractForm";
import { getAgreementDetails, type ContractData } from "@/services/contract";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface DashboardProps {
  account: string | null;
}

const Dashboard = ({ account }: DashboardProps) => {
  const [data, setData] = useState<ContractData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contractId, setContractId] = useState(1);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getAgreementDetails(contractId);
      setData(result);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to fetch contract data";
      setError(errorMsg);
      console.error("Failed to fetch contract data:", err);
    } finally {
      setLoading(false);
    }
  }, [contractId]);

  useEffect(() => {
    fetchData();
  }, [fetchData, account]);

  const handleContractSelect = (id: number) => {
    setContractId(id);
  };

  const handleCreateSuccess = () => {
    setShowCreateForm(false);
    setRefreshTrigger((prev) => prev + 1);
    // Refresh the current contract data
    fetchData();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Rental Management</h2>
            <p className="text-sm text-muted-foreground mt-1">
              View and manage your rental agreements
            </p>
          </div>
          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Contract
          </Button>
        </div>
      </motion.div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        {showCreateForm && (
          <CreateContractForm account={account} onSuccess={handleCreateSuccess} />
        )}

        <ContractsList
          account={account}
          onSelectContract={handleContractSelect}
          selectedContractId={contractId}
          refreshTrigger={refreshTrigger}
        />

        <ContractInfoCard data={data} loading={loading} />
        <ActionPanel data={data} account={account} contractId={contractId} onRefresh={fetchData} />
      </div>
    </div>
  );
};

export default Dashboard;
