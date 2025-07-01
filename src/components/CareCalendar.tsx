import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, CloudRain, Leaf, Sun, Scissors } from 'lucide-react';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isToday } from 'date-fns';

interface CareTask {
  id: string;
  plantId: string;
  plantName: string;
  type: 'water' | 'fertilize' | 'prune' | 'repot' | 'sunlight';
  date: Date;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface CareCalendarProps {
  plants?: any[];
}

export const CareCalendar: React.FC<CareCalendarProps> = ({ plants = [] }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

  // Mock care tasks - replace with actual data
  const careTasks: CareTask[] = [
    {
      id: '1',
      plantId: '1',
      plantName: 'Monstera',
      type: 'water',
      date: new Date(),
      completed: false,
      priority: 'high'
    },
    {
      id: '2',
      plantId: '2',
      plantName: 'Peace Lily',
      type: 'water',
      date: addDays(new Date(), 1),
      completed: false,
      priority: 'medium'
    },
    {
      id: '3',
      plantId: '1',
      plantName: 'Monstera',
      type: 'fertilize',
      date: addDays(new Date(), 3),
      completed: false,
      priority: 'low'
    },
    {
      id: '4',
      plantId: '2',
      plantName: 'Peace Lily',
      type: 'prune',
      date: addDays(new Date(), 5),
      completed: false,
      priority: 'medium'
    }
  ];

  const getTaskIcon = (type: CareTask['type']) => {
    switch (type) {
      case 'water':
        return <CloudRain className="h-4 w-4" />;
      case 'fertilize':
        return <Leaf className="h-4 w-4" />;
      case 'prune':
        return <Scissors className="h-4 w-4" />;
      case 'sunlight':
        return <Sun className="h-4 w-4" />;
      default:
        return <Leaf className="h-4 w-4" />;
    }
  };

  const getTaskColor = (type: CareTask['type']) => {
    switch (type) {
      case 'water':
        return 'text-blue-600 bg-blue-50';
      case 'fertilize':
        return 'text-green-600 bg-green-50';
      case 'prune':
        return 'text-purple-600 bg-purple-50';
      case 'sunlight':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: CareTask['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive text-destructive-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getWeekDays = () => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const end = endOfWeek(selectedDate, { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  };

  const getTasksForDate = (date: Date) => {
    return careTasks.filter(task => isSameDay(task.date, date));
  };

  const toggleTaskCompletion = (taskId: string) => {
    // In a real app, this would update the task in the database
    console.log('Toggle task completion:', taskId);
  };

  const todaysTasks = getTasksForDate(new Date());
  const upcomingTasks = careTasks
    .filter(task => task.date > new Date() && !task.completed)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Care Calendar</h2>
        <p className="text-muted-foreground">
          Stay on top of your plant care schedule
        </p>
      </div>

      {/* Today's Tasks */}
      <Card className="p-6 bg-gradient-card border-primary/10 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Today's Care Tasks</h3>
          <Badge variant="secondary">{todaysTasks.length} tasks</Badge>
        </div>
        
        {todaysTasks.length === 0 ? (
          <div className="text-center py-8">
            <Leaf className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No tasks scheduled for today!</p>
            <p className="text-sm text-muted-foreground">Enjoy your plant-free day 🌱</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todaysTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${getTaskColor(task.type)}`}>
                    {getTaskIcon(task.type)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{task.plantName}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {task.type} • {format(task.date, 'h:mm a')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                  <Button
                    size="sm"
                    variant={task.completed ? "success" : "outline"}
                    onClick={() => toggleTaskCompletion(task.id)}
                  >
                    {task.completed ? '✓' : 'Mark Done'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Weekly View */}
      <Card className="p-6 bg-gradient-card border-primary/10 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">This Week</h3>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant={viewMode === 'week' ? 'default' : 'outline'}
              onClick={() => setViewMode('week')}
            >
              Week
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'month' ? 'default' : 'outline'}
              onClick={() => setViewMode('month')}
            >
              Month
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground p-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {getWeekDays().map((day) => {
            const dayTasks = getTasksForDate(day);
            const isSelected = isSameDay(day, selectedDate);
            const isDayToday = isToday(day);

            return (
              <div
                key={day.toISOString()}
                className={`p-2 rounded-lg border cursor-pointer transition-all duration-200 min-h-[80px] ${
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : isDayToday
                    ? 'border-primary/50 bg-primary/10'
                    : 'border-border hover:border-primary/30'
                }`}
                onClick={() => setSelectedDate(day)}
              >
                <div className="text-center mb-1">
                  <span className={`text-sm ${isDayToday ? 'font-bold text-primary' : 'text-foreground'}`}>
                    {format(day, 'd')}
                  </span>
                </div>
                <div className="space-y-1">
                  {dayTasks.slice(0, 2).map((task) => (
                    <div
                      key={task.id}
                      className={`w-full h-1.5 rounded-full ${getTaskColor(task.type).split(' ')[1]}`}
                    />
                  ))}
                  {dayTasks.length > 2 && (
                    <div className="text-xs text-muted-foreground text-center">
                      +{dayTasks.length - 2}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Upcoming Tasks */}
      <Card className="p-6 bg-gradient-card border-primary/10 shadow-card">
        <h3 className="font-semibold text-lg mb-4">Upcoming Tasks</h3>
        
        {upcomingTasks.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No upcoming tasks</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${getTaskColor(task.type)}`}>
                    {getTaskIcon(task.type)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{task.plantName}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {task.type} • {format(task.date, 'MMM d, h:mm a')}
                    </p>
                  </div>
                </div>
                <Badge className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" size="lg" className="h-20 flex-col">
          <CloudRain className="h-6 w-6 mb-2" />
          Schedule Watering
        </Button>
        <Button variant="outline" size="lg" className="h-20 flex-col">
          <Leaf className="h-6 w-6 mb-2" />
          Add Care Task
        </Button>
      </div>
    </div>
  );
};