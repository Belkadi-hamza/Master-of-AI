import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ethers } from "ethers";
import {
  ArrowDownToLine, Banknote, XSquare, RotateCcw,
  Loader2, CheckCircle2, AlertCircle, ExternalLink, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ContractData } from "@/services/contract";
import * as contractService from "@/services/contract";

interface ActionPanelProps {
  data: ContractData | null;
  account: string | null;
  contractId: number;
  onRefresh: () => void;
}

type TxStatus = "idle" | "pending" | "success" | "error";

interface Message {
  type: "success" | "error" | "info";
  text: string;
  txHash?: string;
}

const ActionPanel = ({ data, account, contractId, onRefresh }: ActionPanelProps) => {
  const [txStatus, setTxStatus] = useState<TxStatus>("idle");
  const [message, setMessage] = useState<Message | null>(null);

  const handleAction = async (
    action: () => Promise<string>,
    successMsg: string
  ) => {
    if (!account) {
      setMessage({ type: "error", text: "Please connect your wallet first." });
      return;
    }
    setTxStatus("pending");
    setMessage({ type: "info", text: "Confirm transaction in MetaMask..." });

    try {
      const txHash = await action();
      setMessage({ type: "info", text: "Transaction submitted. Waiting for confirmation...", txHash });
      
      // Wait for transaction confirmation
      const provider = new ethers.BrowserProvider(window.ethereum!);
      await provider.waitForTransaction(txHash, 1, 30000);
      
      setTxStatus("success");
      setMessage({ type: "success", text: successMsg, txHash });
      onRefresh();
    } catch (err: unknown) {
      setTxStatus("error");
      const errorMsg = err instanceof Error ? err.message : "Transaction failed";
      const short = errorMsg.includes("user rejected")
        ? "Transaction rejected by user."
        : errorMsg.length > 100
          ? errorMsg.slice(0, 100) + "..."
          : errorMsg;
      setMessage({ type: "error", text: short });
    }
  };

  const now = new Date();
  const nextPaymentDate = data ? new Date(data.nextDueDate * 1000) : null;
  const isOverdue = nextPaymentDate ? nextPaymentDate < now : false;
  
  const actions = [
    {
      label: "Pay Deposit",
      icon: ArrowDownToLine,
      color: "bg-primary hover:bg-primary/90 text-primary-foreground",
      amount: data?.securityDeposit || "0",
      description: "Security deposit",
      onClick: () => handleAction(() => contractService.payDeposit(contractId, data!.securityDeposit), "Deposit paid successfully!"),
    },
    {
      label: "Pay Rent",
      icon: Banknote,
      color: "bg-success hover:bg-success/90 text-success-foreground",
      amount: data?.rentAmount || "0",
      description: isOverdue ? "Includes late fees" : "Monthly rent",
      onClick: () => handleAction(() => contractService.payRent(contractId, data!.rentAmount), "Rent paid successfully!"),
      warning: isOverdue,
    },
    {
      label: "Terminate",
      icon: XSquare,
      color: "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
      description: "End lease agreement",
      onClick: () => handleAction(() => contractService.terminateByLandlord(contractId), "Contract terminated."),
    },
    {
      label: "Refund Deposit",
      icon: RotateCcw,
      color: "bg-accent hover:bg-accent/90 text-accent-foreground",
      description: "Claim deposit back",
      onClick: () => handleAction(() => contractService.refundDeposit(contractId), "Deposit refunded!"),
    },
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-6 space-y-5"
    >
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Actions</h2>
      </div>

      {/* Payment Summary */}
      {data && (
        <div className="rounded-lg bg-secondary/50 p-4 space-y-2 border border-border">
          <h3 className="text-xs uppercase tracking-wider text-muted-foreground">Payment Summary</h3>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Base Rent</span>
            <span className="font-mono text-foreground">{data.rentAmount} ETH</span>
          </div>
          {isOverdue && (
            <div className="flex justify-between text-sm">
              <span className="text-warning">Late Fee</span>
              <span className="font-mono text-warning">{data.dailyLateFee} ETH/day</span>
            </div>
          )}
          <div className="border-t border-border pt-2 flex justify-between text-sm font-semibold">
            <span className="text-foreground">Amount Due</span>
            <span className="font-mono text-primary">{data.rentAmount} ETH</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            onClick={action.onClick}
            disabled={txStatus === "pending" || !account}
            className={`${action.color} h-auto flex-col items-start gap-1 p-4 transition-all`}
          >
            <div className="flex items-center gap-2 w-full">
              <action.icon className="h-4 w-4" />
              <span className="font-semibold">{action.label}</span>
              {action.warning && <AlertCircle className="h-3.5 w-3.5 ml-auto" />}
            </div>
            <span className="text-xs opacity-80 font-normal">
              {action.amount && <span className="font-mono">{action.amount} ETH · </span>}
              {action.description}
            </span>
          </Button>
        ))}
      </div>

      {/* Status Messages */}
      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className={`rounded-lg p-4 flex items-start gap-3 border ${
              message.type === "success"
                ? "bg-success/10 border-success/20 text-success"
                : message.type === "error"
                  ? "bg-destructive/10 border-destructive/20 text-destructive"
                  : "bg-primary/10 border-primary/20 text-primary"
            }`}
          >
            {txStatus === "pending" ? (
              <Loader2 className="h-5 w-5 animate-spin shrink-0 mt-0.5" />
            ) : message.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1 min-w-0">
              <p className="text-sm font-medium">{message.text}</p>
              {message.txHash && (
                <a
                  href={`https://etherscan.io/tx/${message.txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs opacity-80 hover:opacity-100 transition-opacity font-mono"
                >
                  {message.txHash.slice(0, 12)}...{message.txHash.slice(-8)}
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ActionPanel;
