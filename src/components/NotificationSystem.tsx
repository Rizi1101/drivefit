
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, X, Car, DollarSign, MessageSquare, Heart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Notification {
  id: number;
  type: 'new_vehicle' | 'price_drop' | 'message' | 'favorite' | 'general';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
}

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Sample notifications - in real app, these would come from database
  useEffect(() => {
    const sampleNotifications: Notification[] = [
      {
        id: 1,
        type: 'new_vehicle',
        title: 'New Vehicle Match!',
        message: '2024 Toyota Corolla GLi in your price range is now available in Karachi',
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 mins ago
        isRead: false,
        actionUrl: '/vehicles/1'
      },
      {
        id: 2,
        type: 'price_drop',
        title: 'Price Drop Alert!',
        message: 'Honda Civic Oriel price reduced by PKR 200,000',
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 mins ago
        isRead: false,
        actionUrl: '/vehicles/2'
      },
      {
        id: 3,
        type: 'message',
        title: 'New Message',
        message: 'Seller replied to your inquiry about Suzuki Swift',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        isRead: true,
        actionUrl: '/dashboard'
      },
      {
        id: 4,
        type: 'favorite',
        title: 'Favorite Vehicle Updated',
        message: 'KIA Sportage Alpha listing has been updated with new photos',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        isRead: true,
        actionUrl: '/vehicles/4'
      }
    ];

    setNotifications(sampleNotifications);
    setUnreadCount(sampleNotifications.filter(n => !n.isRead).length);

    // Simulate real-time notifications
    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every 30 seconds
        addNewNotification();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const addNewNotification = () => {
    const newNotificationTypes = [
      {
        type: 'new_vehicle' as const,
        title: 'New Vehicle Available!',
        message: 'A new vehicle matching your preferences has been listed'
      },
      {
        type: 'price_drop' as const,
        title: 'Price Drop!',
        message: 'One of your watched vehicles has a price reduction'
      },
      {
        type: 'general' as const,
        title: 'DriveFit Update',
        message: 'New features have been added to help you find vehicles faster'
      }
    ];

    const randomNotification = newNotificationTypes[Math.floor(Math.random() * newNotificationTypes.length)];
    
    const newNotification: Notification = {
      id: Date.now(),
      ...randomNotification,
      timestamp: new Date(),
      isRead: false
    };

    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);

    toast({
      title: newNotification.title,
      description: newNotification.message,
    });
  };

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    setUnreadCount(0);
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.isRead) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'new_vehicle': return <Car className="h-4 w-4 text-blue-500" />;
      case 'price_drop': return <DollarSign className="h-4 w-4 text-green-500" />;
      case 'message': return <MessageSquare className="h-4 w-4 text-purple-500" />;
      case 'favorite': return <Heart className="h-4 w-4 text-red-500" />;
      default: return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>

      {showDropdown && (
        <Card className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-hidden shadow-lg z-50">
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Notifications</h3>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-sm text-drivefit-orange"
                >
                  Mark all read
                </Button>
              )}
            </div>
          </div>

          <CardContent className="p-0 max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                    !notification.isRead ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                          className="h-6 w-6 text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {formatTimestamp(notification.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>

          {notifications.length > 0 && (
            <div className="p-3 border-t bg-gray-50 text-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-drivefit-orange"
                onClick={() => setShowDropdown(false)}
              >
                View All Notifications
              </Button>
            </div>
          )}
        </Card>
      )}

      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default NotificationSystem;
