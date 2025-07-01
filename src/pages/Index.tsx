import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CameraCapture } from '@/components/CameraCapture';
import { PlantAnalysis } from '@/components/PlantAnalysis';
import { PlantCard } from '@/components/PlantCard';
import { Navigation } from '@/components/Navigation';
import { Leaf, Camera, Users, CloudRain } from 'lucide-react';
import heroImage from '@/assets/hero-plant.jpg';

interface AnalysisResult {
  plantSpecies: string;
  healthScore: number;
  issues: string[];
  wateringRecommendation: string;
  sunlightNeeds: string;
  nextWateringDate: string;
  confidence: number;
}

const Index = () => {
  const [currentView, setCurrentView] = useState('home');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  // Mock data for demonstration
  const mockPlants = [
    {
      id: '1',
      name: 'Monstera',
      species: 'Monstera Deliciosa',
      imageUrl: heroImage,
      healthScore: 85,
      lastWatered: '2024-01-15',
      nextWatering: '2024-01-22',
      location: 'Living Room'
    },
    {
      id: '2',
      name: 'Peace Lily',
      species: 'Spathiphyllum',
      imageUrl: heroImage,
      healthScore: 92,
      lastWatered: '2024-01-16',
      nextWatering: '2024-01-20',
      location: 'Bedroom'
    }
  ];

  const handleImageCapture = (imageUrl: string) => {
    setCapturedImage(imageUrl);
    setCurrentView('analysis');
  };

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
  };

  const renderHomeView = () => (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="relative overflow-hidden bg-gradient-hero text-white shadow-float">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Leaf className="h-8 w-8 text-white animate-float" />
          </div>
          <h1 className="text-2xl font-bold mb-2">PlantCare AI</h1>
          <p className="text-white/90 mb-6">
            Your intelligent plant companion for healthier, happier plants
          </p>
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => setCurrentView('camera')}
            className="bg-white/20 text-white border-white/30 hover:bg-white/30"
          >
            <Camera className="mr-2 h-5 w-5" />
            Scan Your Plant
          </Button>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-gradient-card border-primary/10 text-center">
          <div className="text-2xl font-bold text-primary">{mockPlants.length}</div>
          <div className="text-sm text-muted-foreground">Plants Tracked</div>
        </Card>
        <Card className="p-4 bg-gradient-card border-primary/10 text-center">
          <div className="text-2xl font-bold text-success">92%</div>
          <div className="text-sm text-muted-foreground">Avg Health</div>
        </Card>
      </div>

      {/* Your Plants */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-foreground">Your Plants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onViewDetails={(plant) => console.log('View details:', plant)}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          size="lg"
          onClick={() => setCurrentView('calendar')}
          className="h-20 flex-col"
        >
          <CloudRain className="h-6 w-6 mb-2" />
          Water Schedule
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          onClick={() => setCurrentView('community')}
          className="h-20 flex-col"
        >
          <Users className="h-6 w-6 mb-2" />
          Community
        </Button>
      </div>
    </div>
  );

  const renderCameraView = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Plant Health Scanner</h2>
        <p className="text-muted-foreground">
          Take a photo to get instant AI-powered plant analysis
        </p>
      </div>
      
      <CameraCapture onImageCapture={handleImageCapture} />
      
      {capturedImage && (
        <Card className="p-4 bg-gradient-card border-primary/10">
          <h3 className="font-semibold mb-2">Captured Image</h3>
          <img 
            src={capturedImage} 
            alt="Captured plant" 
            className="w-full h-48 object-cover rounded-lg"
          />
        </Card>
      )}
    </div>
  );

  const renderAnalysisView = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Plant Analysis</h2>
        <p className="text-muted-foreground">
          AI-powered insights for your plant's health
        </p>
      </div>
      
      {capturedImage && (
        <PlantAnalysis 
          imageUrl={capturedImage}
          onAnalysisComplete={handleAnalysisComplete}
        />
      )}
      
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          onClick={() => {
            setCapturedImage(null);
            setAnalysisResult(null);
            setCurrentView('home');
          }}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return renderHomeView();
      case 'camera':
        return renderCameraView();
      case 'analysis':
        return renderAnalysisView();
      case 'calendar':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Care Calendar</h2>
            <p className="text-muted-foreground">Coming soon!</p>
          </div>
        );
      case 'community':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Plant Community</h2>
            <p className="text-muted-foreground">Coming soon!</p>
          </div>
        );
      default:
        return renderHomeView();
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto p-4">
        {renderCurrentView()}
      </div>
      
      <Navigation 
        currentView={currentView}
        onViewChange={setCurrentView}
      />
    </div>
  );
};

export default Index;
