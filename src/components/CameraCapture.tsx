import React, { useState } from 'react';
import { Camera } from '@capacitor/camera';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera as CameraIcon, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CameraCaptureProps {
  onImageCapture: (imageUrl: string) => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onImageCapture }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const captureImage = async (source: CameraSource) => {
    setIsLoading(true);
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: source,
      });

      if (image.dataUrl) {
        onImageCapture(image.dataUrl);
        toast({
          title: "Photo captured!",
          description: "Analyzing your plant...",
        });
      }
    } catch (error) {
      console.error('Error capturing image:', error);
      toast({
        title: "Camera Error",
        description: "Could not access camera. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-gradient-card border-primary/10 shadow-card">
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Take a Photo of Your Plant
        </h3>
        <p className="text-muted-foreground text-sm mb-6">
          Capture a clear image to get instant AI-powered plant health analysis
        </p>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Button
            variant="camera"
            size="lg"
            onClick={() => captureImage(CameraSource.Camera)}
            disabled={isLoading}
            className="w-full"
          >
            <CameraIcon className="mr-2 h-5 w-5" />
            Use Camera
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => captureImage(CameraSource.Photos)}
            disabled={isLoading}
            className="w-full"
          >
            <Users className="mr-2 h-5 w-5" />
            Choose from Gallery
          </Button>
        </div>
        
        {isLoading && (
          <div className="mt-4 animate-pulse-soft">
            <div className="h-2 bg-primary/20 rounded-full w-full">
              <div className="h-2 bg-gradient-nature rounded-full w-1/3 animate-pulse"></div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Processing...</p>
          </div>
        )}
      </div>
    </Card>
  );
};