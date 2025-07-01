import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Plus, Lock, Globe, Crown, Leaf, MessageCircle, Heart } from 'lucide-react';

interface Community {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  memberCount: number;
  imageUrl: string;
  category: string;
  isPremium?: boolean;
}

interface Post {
  id: string;
  author: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timeAgo: string;
}

export const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchQuery, setSearchQuery] = useState('');

  const communities: Community[] = [
    {
      id: '1',
      name: 'Succulent Lovers',
      description: 'Share your succulent collection and get care tips',
      isPrivate: false,
      memberCount: 1247,
      imageUrl: '/placeholder-succulent.jpg',
      category: 'Succulents'
    },
    {
      id: '2',
      name: 'Indoor Garden Masters',
      description: 'Advanced indoor gardening techniques and discussions',
      isPrivate: true,
      memberCount: 89,
      imageUrl: '/placeholder-indoor.jpg',
      category: 'Indoor Plants',
      isPremium: true
    },
    {
      id: '3',
      name: 'Plant Emergency Room',
      description: 'Get quick help for sick plants from the community',
      isPrivate: false,
      memberCount: 2156,
      imageUrl: '/placeholder-emergency.jpg',
      category: 'Plant Care'
    }
  ];

  const posts: Post[] = [
    {
      id: '1',
      author: 'GreenThumb_Sarah',
      content: 'My monstera finally got a new leaf! 🌱 Any tips for encouraging more growth?',
      likes: 24,
      comments: 8,
      timeAgo: '2h ago'
    },
    {
      id: '2',
      author: 'PlantDad_Mike',
      content: 'Rescued this beauty from the clearance section. Think it can be saved?',
      image: '/placeholder-rescue.jpg',
      likes: 42,
      comments: 15,
      timeAgo: '4h ago'
    }
  ];

  const renderCommunityCard = (community: Community) => (
    <Card key={community.id} className="p-4 bg-gradient-card border-primary/10 hover:shadow-card transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Leaf className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              {community.name}
              {community.isPrivate && <Lock className="h-4 w-4 text-muted-foreground" />}
              {community.isPremium && <Crown className="h-4 w-4 text-warning" />}
            </h3>
            <p className="text-sm text-muted-foreground">{community.memberCount} members</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs">
          {community.category}
        </Badge>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">{community.description}</p>
      
      <div className="flex gap-2">
        <Button size="sm" className="flex-1">
          {community.isPrivate ? 'Request to Join' : 'Join Community'}
        </Button>
        <Button variant="outline" size="sm">
          <MessageCircle className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );

  const renderPost = (post: Post) => (
    <Card key={post.id} className="p-4 bg-gradient-card border-primary/10">
      <div className="flex items-start space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-primary/10 text-primary">
            {post.author.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-foreground">{post.author}</span>
            <span className="text-xs text-muted-foreground">{post.timeAgo}</span>
          </div>
          
          <p className="text-sm text-foreground mb-3">{post.content}</p>
          
          {post.image && (
            <div className="w-full h-48 bg-muted rounded-lg mb-3"></div>
          )}
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <button className="flex items-center space-x-1 hover:text-primary transition-colors">
              <Heart className="h-4 w-4" />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-primary transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments}</span>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Plant Community</h2>
        <p className="text-muted-foreground">Connect with fellow plant enthusiasts</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="my-teams">My Teams</TabsTrigger>
          <TabsTrigger value="feed">Feed</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search communities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Create
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Community</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Community name" />
                  <Input placeholder="Description" />
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="private" />
                    <label htmlFor="private" className="text-sm">Make private</label>
                  </div>
                  <Button className="w-full">Create Community</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {communities.map(renderCommunityCard)}
          </div>
        </TabsContent>

        <TabsContent value="my-teams" className="space-y-4">
          <div className="text-center py-12">
            <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Teams Yet</h3>
            <p className="text-muted-foreground mb-4">Join or create a team to get started</p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Team
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="feed" className="space-y-4">
          <div className="space-y-4">
            {posts.map(renderPost)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};