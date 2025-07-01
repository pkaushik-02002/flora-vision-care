import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Leaf, Calendar, CloudRain } from 'lucide-react';

interface AnalysisResult {
  plantSpecies: string;
  healthScore: number;
  issues: string[];
  wateringRecommendation: string;
  sunlightNeeds: string;
  nextWateringDate: string;
  confidence: number;
}

interface PlantAnalysisProps {
  imageUrl: string;
  onAnalysisComplete: (result: AnalysisResult) => void;
}

export const PlantAnalysis: React.FC<PlantAnalysisProps> = ({ 
  imageUrl, 
  onAnalysisComplete 
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const performAnalysis = async () => {
      setIsAnalyzing(true);
      
      // Simulate AI analysis - replace with actual AI model inference
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockResult: AnalysisResult = {
        plantSpecies: "Monstera Deliciosa",
        healthScore: 85,
        issues: ["Slight overwatering", "Lower leaves showing yellowing"],
        wateringRecommendation: "Water every 7-10 days, allow soil to dry between waterings",
        sunlightNeeds: "Bright, indirect light",
        nextWateringDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        confidence: 92
      };
      
      setAnalysis(mockResult);
      setIsAnalyzing(false);
      onAnalysisComplete(mockResult);
    };

    performAnalysis();
  }, [imageUrl, onAnalysisComplete]);

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-destructive';
  };

  if (isAnalyzing) {
    return (
      <Card className="p-6 bg-gradient-card border-primary/10 shadow-card">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-nature rounded-full flex items-center justify-center animate-pulse-soft">
            <Leaf className="h-8 w-8 text-white animate-float" />
          </div>
          <h3 className="text-lg font-semibold">Analyzing Your Plant</h3>
          <p className="text-muted-foreground">
            Our AI is examining your plant's health, species, and care needs...
          </p>
          <div className="space-y-2">
            <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
              <div className="h-2 bg-gradient-nature rounded-full animate-pulse w-2/3"></div>
            </div>
            <p className="text-sm text-muted-foreground">This may take a few moments</p>
          </div>
        </div>
      </Card>
    );
  }

  if (!analysis) return null;

  return (
    <div className="space-y-4">
      <Card className="p-6 bg-gradient-card border-primary/10 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-foreground">{analysis.plantSpecies}</h3>
          <Badge variant="secondary" className="text-sm">
            {analysis.confidence}% confidence
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Health Score</label>
            <div className="flex items-center space-x-2">
              <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getHealthColor(analysis.healthScore)} transition-all duration-500`}
                  style={{ width: `${analysis.healthScore}%` }}
                />
              </div>
              <span className="font-semibold text-sm">{analysis.healthScore}/100</span>
            </div>
          </div>
        </div>

        {analysis.issues.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold mb-2 text-warning-foreground">Issues Detected</h4>
            <div className="space-y-2">
              {analysis.issues.map((issue, index) => (
                <Badge key={index} variant="outline" className="mr-2 mb-2">
                  {issue}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 bg-background/50">
            <div className="flex items-center space-x-2 mb-2">
              <CloudRain className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">Watering</span>
            </div>
            <p className="text-sm text-muted-foreground">{analysis.wateringRecommendation}</p>
          </Card>
          
          <Card className="p-4 bg-background/50">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">Next Watering</span>
            </div>
            <p className="text-sm text-muted-foreground">{analysis.nextWateringDate}</p>
          </Card>
        </div>

        <div className="mt-6 flex justify-center">
          <Button variant="hero" size="lg">
            Save to My Plants
          </Button>
        </div>
      </Card>
    </div>
  );
};