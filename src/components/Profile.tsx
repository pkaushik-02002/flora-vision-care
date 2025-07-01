import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Camera, 
  Calendar, 
  CloudRain, 
  Leaf, 
  Settings, 
  User,
  Bell,
  Shield,
  Crown,
  Star
} from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  plantsCount: number;
  successfulDiagnoses: number;
  memberSince: string;
  subscriptionTier: 'free' | 'premium';
  location: string;
  experience: 'beginner' | 'intermediate' | 'expert';
}

interface ProfileProps {
  onEditProfile?: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ onEditProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState({
    wateringReminders: true,
    careUpdates: true,
    communityActivity: false,
    weeklyReports: true
  });

  // Mock user data - replace with actual user data
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Plant Lover',
    email: 'plantlover@example.com',
    avatar: '',
    plantsCount: 12,
    successfulDiagnoses: 45,
    memberSince: 'January 2024',
    subscriptionTier: 'free',
    location: 'Living Room, Bedroom',
    experience: 'intermediate'
  });

  const stats = [
    {
      label: 'Plants Tracked',
      value: userProfile.plantsCount,
      icon: <Leaf className="h-5 w-5 text-primary" />,
      color: 'text-primary'
    },
    {
      label: 'Diagnoses Made',
      value: userProfile.successfulDiagnoses,
      icon: <Camera className="h-5 w-5 text-success" />,
      color: 'text-success'
    },
    {
      label: 'Care Reminders',
      value: 24,
      icon: <Calendar className="h-5 w-5 text-warning" />,
      color: 'text-warning'
    },
    {
      label: 'Success Rate',
      value: '89%',
      icon: <Star className="h-5 w-5 text-earth" />,
      color: 'text-earth'
    }
  ];

  const achievements = [
    { name: 'Plant Parent', description: 'Added your first plant', earned: true },
    { name: 'Green Thumb', description: 'Successfully diagnosed 10 plants', earned: true },
    { name: 'Care Expert', description: 'Maintained perfect care streak for 30 days', earned: false },
    { name: 'Community Helper', description: 'Helped 5 other plant parents', earned: false }
  ];

  const getExperienceBadge = (experience: string) => {
    switch (experience) {
      case 'beginner':
        return <Badge variant="secondary">🌱 Beginner</Badge>;
      case 'intermediate':
        return <Badge variant="outline" className="border-warning text-warning">🌿 Intermediate</Badge>;
      case 'expert':
        return <Badge variant="outline" className="border-success text-success">🌳 Expert</Badge>;
      default:
        return <Badge variant="secondary">🌱 Beginner</Badge>;
    }
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // In a real app, save profile changes to backend
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Profile</h2>
        <p className="text-muted-foreground">
          Manage your plant care journey
        </p>
      </div>

      {/* Profile Info */}
      <Card className="p-6 bg-gradient-card border-primary/10 shadow-card">
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
          <div className="relative">
            <Avatar className="h-24 w-24 ring-4 ring-primary/20">
              <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              <AvatarFallback className="bg-gradient-nature text-white text-xl">
                {userProfile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="outline"
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-background shadow-md"
              onClick={() => console.log('Change avatar')}
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="text-xl font-bold text-foreground">{userProfile.name}</h3>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                {getExperienceBadge(userProfile.experience)}
                {userProfile.subscriptionTier === 'premium' && (
                  <Badge className="bg-gradient-nature text-white">
                    <Crown className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
            </div>
            <p className="text-muted-foreground mb-1">{userProfile.email}</p>
            <p className="text-sm text-muted-foreground">
              Member since {userProfile.memberSince}
            </p>
          </div>
          
          <Button
            variant={isEditing ? "success" : "outline"}
            onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
          >
            {isEditing ? 'Save' : 'Edit Profile'}
          </Button>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4 bg-gradient-card border-primary/10 text-center">
            <div className="flex justify-center mb-2">
              {stat.icon}
            </div>
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground">
              {stat.label}
            </div>
          </Card>
        ))}
      </div>

      {/* Profile Settings */}
      {isEditing && (
        <Card className="p-6 bg-gradient-card border-primary/10 shadow-card">
          <h3 className="font-semibold text-lg mb-4">Edit Profile</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={userProfile.email}
                  onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="location">Plant Locations</Label>
              <Input
                id="location"
                value={userProfile.location}
                onChange={(e) => setUserProfile({...userProfile, location: e.target.value})}
                placeholder="Living Room, Bedroom, Kitchen..."
              />
            </div>
          </div>
        </Card>
      )}

      {/* Notifications */}
      <Card className="p-6 bg-gradient-card border-primary/10 shadow-card">
        <div className="flex items-center space-x-2 mb-4">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">Notification Settings</h3>
        </div>
        
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm capitalize">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </p>
                <p className="text-xs text-muted-foreground">
                  {key === 'wateringReminders' && 'Get reminded when your plants need water'}
                  {key === 'careUpdates' && 'Receive plant care tips and updates'}
                  {key === 'communityActivity' && 'Stay updated with community posts'}
                  {key === 'weeklyReports' && 'Weekly summary of your plant care progress'}
                </p>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(checked) => 
                  setNotifications({...notifications, [key]: checked})
                }
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Achievements */}
      <Card className="p-6 bg-gradient-card border-primary/10 shadow-card">
        <div className="flex items-center space-x-2 mb-4">
          <Star className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">Achievements</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                achievement.earned
                  ? 'bg-primary/5 border-primary/20'
                  : 'bg-muted/30 border-border opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{achievement.name}</h4>
                {achievement.earned && (
                  <Star className="h-4 w-4 text-warning fill-warning" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Premium Upgrade */}
      {userProfile.subscriptionTier === 'free' && (
        <Card className="p-6 bg-gradient-earth border-earth/20 shadow-card">
          <div className="text-center">
            <Crown className="h-12 w-12 mx-auto text-earth mb-4" />
            <h3 className="font-bold text-lg text-earth-foreground mb-2">
              Upgrade to Premium
            </h3>
            <p className="text-earth-foreground/80 text-sm mb-4">
              Unlock unlimited diagnoses, cloud sync, and priority AI support
            </p>
            <Button variant="earth" size="lg">
              Upgrade Now
            </Button>
          </div>
        </Card>
      )}

      {/* Account Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button variant="outline" size="lg" className="h-16 flex-col">
          <Settings className="h-6 w-6 mb-2" />
          App Settings
        </Button>
        <Button variant="outline" size="lg" className="h-16 flex-col">
          <Shield className="h-6 w-6 mb-2" />
          Privacy & Security
        </Button>
      </div>
    </div>
  );
};