import { motion } from "framer-motion";
import {
  Shield, User, Users, Coins, Calendar, Clock, CheckCircle2,
  XCircle, TrendingUp, AlertTriangle
} from "lucide-react";
import type { ContractData } from "@/services/contract";

interface ContractInfoCardProps {
  data: ContractData | null;
  loading: boolean;
}

const ContractInfoCard = ({ data, loading }: ContractInfoCardProps) => {
  if (loading) {
    return (
      <div className="glass-card p-6 space-y-4">
        <div className="h-6 w-40 rounded bg-muted animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg bg-muted/50 p-4 space-y-2">
              <div className="h-4 w-20 rounded bg-muted animate-pulse" />
              <div className="h-5 w-32 rounded bg-muted animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const truncate = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  const nextPaymentDate = new Date(data.nextDueDate * 1000);
  const now = new Date();
  const isOverdue = nextPaymentDate < now;
  const daysUntilDue = Math.ceil((nextPaymentDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  const infoItems = [
    {
      icon: CheckCircle2,
      label: "Landlord",
      value: truncate(data.landlord),
      mono: true,
    },
    {
      icon: Users,
      label: "Tenant",
      value: truncate(data.tenant),
      mono: true,
    },
    {
      icon: Coins,
      label: "Monthly Rent",
      value: `${data.rentAmount} ETH`,
      highlight: true,
    },
    {
      icon: Shield,
      label: "Security Deposit",
      value: `${data.securityDeposit} ETH`,
    },
    {
      icon: AlertTriangle,
      label: "Daily Late Fee",
      value: `${data.dailyLateFee} ETH`,
      color: "text-warning",
    },
    {
      icon: Calendar,
      label: "Lease Duration",
      value: `${data.durationMonths} months`,
    },
    {
      icon: TrendingUp,
      label: "Months Paid",
      value: `${data.monthsPaid}/${data.durationMonths}`,
    },
    {
      icon: Clock,
      label: "Next Payment Due",
      value: nextPaymentDate.toLocaleDateString(),
      color: isOverdue ? "text-destructive" : "text-muted-foreground",
    },
    {
      icon: isOverdue ? AlertTriangle : CheckCircle2,
      label: "Payment Status",
      value: isOverdue ? `${Math.abs(daysUntilDue)} days overdue` : `Due in ${daysUntilDue} days`,
      color: isOverdue ? "text-destructive" : "text-success",
      badge: true,
    },
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="glass-card p-6 space-y-5"
    >
      <div className="flex items-center gap-2">
        <User className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Contract Overview</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {infoItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05 * i }}
            className="group rounded-lg bg-secondary/50 p-4 hover:bg-secondary/80 transition-colors border border-transparent hover:border-primary/10"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <item.icon className={`h-4 w-4 ${item.color || "text-muted-foreground"}`} />
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-semibold ${item.mono ? "font-mono" : ""} ${
                  item.highlight ? "text-primary" : item.color || "text-foreground"
                }`}
              >
                {item.value}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ContractInfoCard;
