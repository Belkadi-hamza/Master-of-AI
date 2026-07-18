import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Zap } from "lucide-react";

interface PredictionFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

interface FormData {
  home_shots: number;
  home_shotsOnTarget: number;
  home_ppda: number;
  away_shots: number;
  away_shotsOnTarget: number;
  away_ppda: number;
}

const inputFields = [
  { key: "home_shots", label: "Home Shots", placeholder: "e.g., 12" },
  { key: "home_shotsOnTarget", label: "Home Shots on Target", placeholder: "e.g., 5" },
  { key: "home_ppda", label: "Home PPDA", placeholder: "e.g., 9.5" },
  { key: "away_shots", label: "Away Shots", placeholder: "e.g., 8" },
  { key: "away_shotsOnTarget", label: "Away Shots on Target", placeholder: "e.g., 3" },
  { key: "away_ppda", label: "Away PPDA", placeholder: "e.g., 11.2" },
];

export function PredictionForm({ onSubmit, isLoading }: PredictionFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({
    home_shots: "",
    home_shotsOnTarget: "",
    home_ppda: "",
    away_shots: "",
    away_shotsOnTarget: "",
    away_ppda: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    inputFields.forEach(({ key, label }) => {
      const value = formData[key];
      if (!value.trim()) {
        newErrors[key] = `${label} is required`;
      } else if (isNaN(parseFloat(value)) || parseFloat(value) < 0) {
        newErrors[key] = `${label} must be a valid positive number`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const data: FormData = {
        home_shots: parseFloat(formData.home_shots),
        home_shotsOnTarget: parseFloat(formData.home_shotsOnTarget),
        home_ppda: parseFloat(formData.home_ppda),
        away_shots: parseFloat(formData.away_shots),
        away_shotsOnTarget: parseFloat(formData.away_shotsOnTarget),
        away_ppda: parseFloat(formData.away_ppda),
      };
      onSubmit(data);
    }
  };

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Home Team Stats */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-home-win" />
            <h3 className="text-lg font-semibold text-foreground">Home Team</h3>
          </div>
          {inputFields.slice(0, 3).map(({ key, label, placeholder }) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key} className="text-sm font-medium text-muted-foreground">
                {label}
              </Label>
              <Input
                id={key}
                type="number"
                step="0.1"
                min="0"
                placeholder={placeholder}
                value={formData[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                className={`input-field ${errors[key] ? "border-destructive ring-destructive/50" : ""}`}
              />
              {errors[key] && (
                <p className="text-xs text-destructive animate-fade-in">{errors[key]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Away Team Stats */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-away-win" />
            <h3 className="text-lg font-semibold text-foreground">Away Team</h3>
          </div>
          {inputFields.slice(3).map(({ key, label, placeholder }) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key} className="text-sm font-medium text-muted-foreground">
                {label}
              </Label>
              <Input
                id={key}
                type="number"
                step="0.1"
                min="0"
                placeholder={placeholder}
                value={formData[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                className={`input-field ${errors[key] ? "border-destructive ring-destructive/50" : ""}`}
              />
              {errors[key] && (
                <p className="text-xs text-destructive animate-fade-in">{errors[key]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground glow-primary transition-all duration-300 hover:scale-[1.02]"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Zap className="mr-2 h-5 w-5" />
            Predict Outcome
          </>
        )}
      </Button>
    </form>
  );
}
