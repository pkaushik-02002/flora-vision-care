import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Leaf, Zap, Users, Camera, Calendar, Cloud, Bot, Shield } from 'lucide-react';

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  isPremium?: boolean;
  buttonText: string;
  buttonVariant: 'default' | 'outline' | 'secondary';
}

export const PricingPage: React.FC = () => {
  const pricingTiers: PricingTier[] = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with plant care',
      features: [
        '3 plant diagnoses per month',
        'Basic plant identification',
        'Care calendar',
        'Community access',
        'Basic care tips'
      ],
      buttonText: 'Get Started Free',
      buttonVariant: 'outline'
    },
    {
      name: 'Plant Parent',
      price: '$4.99',
      period: 'month',
      description: 'For dedicated plant enthusiasts',
      features: [
        'Unlimited plant diagnoses',
        'Advanced AI plant identification',
        'Weather-based care suggestions',
        'Progress tracking & analytics',
        'Priority community support',
        'Offline diagnosis capability',
        'Export care reports'
      ],
      isPopular: true,
      buttonText: 'Start Free Trial',
      buttonVariant: 'default'
    },
    {
      name: 'Green Expert',
      price: '$9.99',
      period: 'month',
      description: 'For professionals and plant collectors',
      features: [
        'Everything in Plant Parent',
        'PlantBot AI assistant chat',
        'Private community access',
        'Advanced plant database',
        'IoT device integration',
        'Custom care schedules',
        'Team collaboration features',
        'Priority customer support',
        'Early access to new features'
      ],
      isPremium: true,
      buttonText: 'Go Premium',
      buttonVariant: 'default'
    }
  ];

  const features = [
    {
      icon: Camera,
      title: 'AI Plant Diagnosis',
      description: 'Instant health analysis from photos'
    },
    {
      icon: Leaf,
      title: 'Plant Identification',
      description: 'Identify 10,000+ plant species'
    },
    {
      icon: Calendar,
      title: 'Smart Care Calendar',
      description: 'Weather-based watering reminders'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with plant enthusiasts'
    },
    {
      icon: Bot,
      title: 'PlantBot Assistant',
      description: 'AI-powered plant care guidance'
    },
    {
      icon: Cloud,
      title: 'Cloud Sync',
      description: 'Access your data anywhere'
    }
  ];

  const renderPricingCard = (tier: PricingTier) => (
    <Card 
      key={tier.name} 
      className={`relative p-6 ${tier.isPopular ? 'border-primary shadow-nature' : 'border-border'} ${tier.isPremium ? 'bg-gradient-hero text-white' : 'bg-gradient-card'} transition-all duration-300 hover:shadow-float`}
    >
      {tier.isPopular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
          Most Popular
        </Badge>
      )}
      
      {tier.isPremium && (
        <div className="absolute top-4 right-4">
          <Crown className="h-6 w-6 text-warning" />
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className={`text-xl font-bold mb-2 ${tier.isPremium ? 'text-white' : 'text-foreground'}`}>
          {tier.name}
        </h3>
        <div className="mb-2">
          <span className={`text-3xl font-bold ${tier.isPremium ? 'text-white' : 'text-foreground'}`}>
            {tier.price}
          </span>
          <span className={`text-sm ${tier.isPremium ? 'text-white/80' : 'text-muted-foreground'}`}>
            /{tier.period}
          </span>
        </div>
        <p className={`text-sm ${tier.isPremium ? 'text-white/90' : 'text-muted-foreground'}`}>
          {tier.description}
        </p>
      </div>

      <ul className="space-y-3 mb-6">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-3">
            <Check className={`h-5 w-5 mt-0.5 ${tier.isPremium ? 'text-white' : 'text-success'}`} />
            <span className={`text-sm ${tier.isPremium ? 'text-white/90' : 'text-foreground'}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Button 
        className={`w-full ${tier.isPremium ? 'bg-white text-primary hover:bg-white/90' : ''}`}
        variant={tier.isPremium ? 'secondary' : tier.buttonVariant}
        size="lg"
      >
        {tier.buttonText}
      </Button>
    </Card>
  );

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Choose Your Plant Care Plan
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get the tools and insights you need to become a confident plant parent
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {pricingTiers.map(renderPricingCard)}
      </div>

      {/* Features Grid */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Everything You Need for Plant Success
          </h2>
          <p className="text-muted-foreground">
            Powerful features to help your plants thrive
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-gradient-card border-primary/10 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gradient-card rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-foreground mb-2">Can I cancel anytime?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, you can cancel your subscription at any time. No hidden fees or long-term commitments.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Is there a free trial?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, we offer a 7-day free trial for all paid plans. No credit card required to start.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">What about data privacy?</h3>
            <p className="text-sm text-muted-foreground">
              Your data is secure and private. We offer on-device analysis and give you full control over your images.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Do you offer team discounts?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, we offer special pricing for teams and educational institutions. Contact us for details.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-hero text-white rounded-lg p-8">
        <Leaf className="h-12 w-12 mx-auto mb-4 animate-float" />
        <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Plant Care?</h2>
        <p className="text-white/90 mb-6 max-w-md mx-auto">
          Join thousands of happy plant parents who've improved their green thumb with PlantCare AI
        </p>
        <Button size="lg" className="bg-white text-primary hover:bg-white/90">
          <Zap className="h-5 w-5 mr-2" />
          Start Your Journey
        </Button>
      </div>
    </div>
  );
};