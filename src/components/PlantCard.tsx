import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, CloudRain, Leaf } from 'lucide-react';

interface Plant {
  id: string;
  name: string;
  species: string;
  imageUrl: string;
  healthScore: number;
  lastWatered: string;
  nextWatering: string;
  location: string;
}

interface PlantCardProps {
  plant: Plant;
  onViewDetails: (plant: Plant) => void;
}

export const PlantCard: React.FC<PlantCardProps> = ({ plant, onViewDetails }) => {
  const getHealthColor = (score: number) => {
    if (score >= 80) return 'bg-success text-success-foreground';
    if (score >= 60) return 'bg-warning text-warning-foreground';
    return 'bg-destructive text-destructive-foreground';
  };

  const isWateringDue = () => {
    const today = new Date();
    const nextWaterDate = new Date(plant.nextWatering);
    return nextWaterDate <= today;
  };

  return (
    <Card className="overflow-hidden bg-gradient-card border-primary/10 shadow-card hover:shadow-float transition-all duration-300 hover:scale-[1.02]">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={plant.imageUrl} 
          alt={plant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className={getHealthColor(plant.healthScore)}>
            {plant.healthScore}% Healthy
          </Badge>
        </div>
        {isWateringDue() && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-warning text-warning-foreground animate-pulse-soft">
              <CloudRain className="h-3 w-3 mr-1" />
              Water Due
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-foreground">{plant.name}</h3>
          <p className="text-sm text-muted-foreground">{plant.species}</p>
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>Next: {new Date(plant.nextWatering).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Leaf className="h-3 w-3" />
            <span>{plant.location}</span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onViewDetails(plant)}
          className="w-full"
        >
          View Details
        </Button>
      </div>
    </Card>
  );
};