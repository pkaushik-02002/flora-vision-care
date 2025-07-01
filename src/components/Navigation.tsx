import React from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Users, Calendar, Leaf, User, DollarSign } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: 'home', icon: Leaf, label: 'Plants' },
    { id: 'camera', icon: Camera, label: 'Scan' },
    { id: 'calendar', icon: Calendar, label: 'Care' },
    { id: 'community', icon: Users, label: 'Community' },
    { id: 'pricing', icon: DollarSign, label: 'Premium' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border shadow-lg z-50">
      <div className="flex justify-around items-center py-2 px-4 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 transition-all duration-200 ${
                isActive 
                  ? 'text-primary bg-primary/10 scale-110' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'animate-scale-in' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="w-1 h-1 bg-primary rounded-full animate-scale-in" />
              )}
            </Button>
          );
        })}
      </div>
    </nav>
  );
};