import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createRentalAgreement } from "@/services/contract";

interface CreateContractFormProps {
  account: string | null;
  onSuccess?: () => void;
}

const CreateContractForm = ({ account, onSuccess }: CreateContractFormProps) => {
  const [formData, setFormData] = useState({
    tenant: "",
    rentAmount: "",
    securityDeposit: "",
    dailyLateFee: "",
    durationMonths: "12",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      // Validation
      if (!formData.tenant || !formData.tenant.startsWith("0x")) {
        throw new Error("Invalid tenant address");
      }
      if (!formData.rentAmount || parseFloat(formData.rentAmount) <= 0) {
        throw new Error("Rent amount must be greater than 0");
      }
      if (!formData.securityDeposit || parseFloat(formData.securityDeposit) <= 0) {
        throw new Error("Security deposit must be greater than 0");
      }
      if (!formData.dailyLateFee || parseFloat(formData.dailyLateFee) <= 0) {
        throw new Error("Daily late fee must be greater than 0");
      }

      // Calculate dates (start tomorrow, first due date 30 days later)
      const now = Math.floor(Date.now() / 1000);
      const startDate = now + 86400; // tomorrow
      const firstDueDate = startDate + 2592000; // 30 days later

      // Create contract
      await createRentalAgreement(
        formData.tenant,
        formData.rentAmount,
        formData.securityDeposit,
        formData.dailyLateFee,
        startDate,
        firstDueDate,
        parseInt(formData.durationMonths)
      );

      setSuccess("Contract created successfully!");
      setFormData({
        tenant: "",
        rentAmount: "",
        securityDeposit: "",
        dailyLateFee: "",
        durationMonths: "12",
      });

      if (onSuccess) {
        setTimeout(onSuccess, 2000);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to create contract";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!account) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Please connect your wallet to create a contract</AlertDescription>
      </Alert>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="glass-card p-6 space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold text-foreground">Create New Rental Agreement</h3>
        <p className="text-sm text-muted-foreground">As Landlord: {account.slice(0, 6)}...{account.slice(-4)}</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-500/30 bg-green-500/10">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-600">{success}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground">Tenant Address</label>
          <Input
            type="text"
            name="tenant"
            placeholder="0x..."
            value={formData.tenant}
            onChange={handleChange}
            disabled={loading}
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground">Monthly Rent (ETH)</label>
            <Input
              type="number"
              name="rentAmount"
              placeholder="0.5"
              value={formData.rentAmount}
              onChange={handleChange}
              disabled={loading}
              step="0.01"
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Security Deposit (ETH)</label>
            <Input
              type="number"
              name="securityDeposit"
              placeholder="1.0"
              value={formData.securityDeposit}
              onChange={handleChange}
              disabled={loading}
              step="0.01"
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground">Daily Late Fee (ETH)</label>
            <Input
              type="number"
              name="dailyLateFee"
              placeholder="0.01"
              value={formData.dailyLateFee}
              onChange={handleChange}
              disabled={loading}
              step="0.001"
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Duration (Months)</label>
            <Input
              type="number"
              name="durationMonths"
              placeholder="12"
              value={formData.durationMonths}
              onChange={handleChange}
              disabled={loading}
              className="mt-1"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-2"
        >
          {loading ? (
            <>
              <Loader className="h-4 w-4 mr-2 animate-spin" />
              Creating Contract...
            </>
          ) : (
            "Create Contract"
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default CreateContractForm;
