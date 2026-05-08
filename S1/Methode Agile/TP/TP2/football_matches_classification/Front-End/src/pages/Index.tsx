import { useState } from "react";
import { PredictionForm } from "@/components/PredictionForm";
import { PredictionResults } from "@/components/PredictionResults";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Activity, AlertCircle, Goal } from "lucide-react";

interface PredictionResponse {
  prediction: string;
  probabilities: {
    "Home Win": number;
    Draw: number;
    "Away Win": number;
  };
}

interface FormData {
  home_shots: number;
  home_shotsOnTarget: number;
  home_ppda: number;
  away_shots: number;
  away_shotsOnTarget: number;
  away_ppda: number;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const prediction: PredictionResponse = await response.json();
      setResult(prediction);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to get prediction. Please check your API connection."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Goal className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">FootPredict</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Match Predictions</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-3">
            Football Match Predictor
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Enter match statistics to predict the outcome using our machine learning model.
            Provide shots, shots on target, and PPDA for both teams.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Card */}
          <Card className="glass-card animate-fade-in" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Match Statistics
              </CardTitle>
              <CardDescription>
                Enter the match data to generate a prediction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PredictionForm onSubmit={handleSubmit} isLoading={isLoading} />
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="glass-card animate-fade-in" style={{ animationDelay: "200ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Goal className="h-5 w-5 text-primary" />
                Prediction Results
              </CardTitle>
              <CardDescription>
                AI-generated match outcome prediction
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="animate-fade-in">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {!result && !error && !isLoading && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="p-4 rounded-full bg-muted/50 mb-4">
                    <Goal className="h-10 w-10 text-muted-foreground/50" />
                  </div>
                  <p className="text-muted-foreground">
                    Enter match statistics and click "Predict Outcome" to see results
                  </p>
                </div>
              )}

              {isLoading && (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-pulse-slow">
                  <div className="p-4 rounded-full bg-primary/10 mb-4">
                    <Activity className="h-10 w-10 text-primary animate-pulse" />
                  </div>
                  <p className="text-muted-foreground">Analyzing match data...</p>
                </div>
              )}

              {result && <PredictionResults prediction={result.prediction} probabilities={result.probabilities} />}
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <div className="mt-8 p-4 rounded-lg bg-muted/30 border border-border/50 animate-fade-in" style={{ animationDelay: "300ms" }}>
          <h3 className="text-sm font-semibold text-foreground mb-2">About PPDA</h3>
          <p className="text-sm text-muted-foreground">
            <strong>PPDA (Passes Per Defensive Action)</strong> measures pressing intensity. 
            Lower values indicate more aggressive pressing, while higher values suggest a more passive defensive approach.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-4 text-center">
          <p className="text-sm text-muted-foreground">
            FootPredict API Testing Interface
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
