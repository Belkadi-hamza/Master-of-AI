import { Trophy, Minus, Target } from "lucide-react";

interface PredictionResultsProps {
  prediction: string;
  probabilities: {
    "Home Win": number;
    Draw: number;
    "Away Win": number;
  };
}

export function PredictionResults({ prediction, probabilities }: PredictionResultsProps) {
  const getOutcomeStyles = (outcome: string) => {
    switch (outcome) {
      case "Home Win":
        return {
          icon: <Trophy className="h-8 w-8" />,
          bgClass: "bg-home-win/20 border-home-win/50",
          textClass: "text-home-win",
          label: "Home Win",
        };
      case "Draw":
        return {
          icon: <Minus className="h-8 w-8" />,
          bgClass: "bg-draw/20 border-draw/50",
          textClass: "text-draw",
          label: "Draw",
        };
      case "Away Win":
        return {
          icon: <Target className="h-8 w-8" />,
          bgClass: "bg-away-win/20 border-away-win/50",
          textClass: "text-away-win",
          label: "Away Win",
        };
      default:
        return {
          icon: <Trophy className="h-8 w-8" />,
          bgClass: "bg-muted border-border",
          textClass: "text-foreground",
          label: outcome,
        };
    }
  };

  const outcomeStyles = getOutcomeStyles(prediction);

  const probabilityItems = [
    { key: "Home Win", value: probabilities["Home Win"], barClass: "probability-home" },
    { key: "Draw", value: probabilities.Draw, barClass: "probability-draw" },
    { key: "Away Win", value: probabilities["Away Win"], barClass: "probability-away" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Main Prediction */}
      <div className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 ${outcomeStyles.bgClass} animate-scale-in`}>
        <div className={`${outcomeStyles.textClass} mb-3`}>
          {outcomeStyles.icon}
        </div>
        <p className="text-sm font-medium text-muted-foreground mb-1">Predicted Outcome</p>
        <h2 className={`text-3xl font-bold ${outcomeStyles.textClass}`}>
          {outcomeStyles.label}
        </h2>
      </div>

      {/* Probability Bars */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Probability Distribution
        </h3>
        
        {probabilityItems.map(({ key, value, barClass }, index) => (
          <div 
            key={key} 
            className="space-y-2 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-foreground">{key}</span>
              <span className="text-sm font-bold text-foreground">
                {(value * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                className={`probability-bar ${barClass}`}
                style={{ 
                  width: `${value * 100}%`,
                  transition: 'width 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Probability Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 rounded-lg bg-home-win/10 border border-home-win/30 text-center">
          <p className="text-2xl font-bold text-home-win">
            {(probabilities["Home Win"] * 100).toFixed(0)}%
          </p>
          <p className="text-xs text-muted-foreground mt-1">Home</p>
        </div>
        <div className="p-4 rounded-lg bg-draw/10 border border-draw/30 text-center">
          <p className="text-2xl font-bold text-draw">
            {(probabilities.Draw * 100).toFixed(0)}%
          </p>
          <p className="text-xs text-muted-foreground mt-1">Draw</p>
        </div>
        <div className="p-4 rounded-lg bg-away-win/10 border border-away-win/30 text-center">
          <p className="text-2xl font-bold text-away-win">
            {(probabilities["Away Win"] * 100).toFixed(0)}%
          </p>
          <p className="text-xs text-muted-foreground mt-1">Away</p>
        </div>
      </div>
    </div>
  );
}
