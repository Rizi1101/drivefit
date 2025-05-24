import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase is properly configured
const isSupabaseConfigured = supabaseUrl && supabaseKey;

// Create Supabase client only if configured, otherwise use mock with real-time simulation
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Real-time mock data store
let mockVehicles: any[] = [
  {
    id: 1,
    title: "2022 Toyota Corolla GLi",
    price: "PKR 4,850,000",
    priceNumber: 4850000,
    location: "Karachi, Sindh",
    status: "active",
    seller: "Ahmed Motors",
    dateAdded: "2024-05-10",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "2021 Honda Civic Oriel",
    price: "PKR 5,350,000",
    priceNumber: 5350000,
    location: "Lahore, Punjab",
    status: "pending",
    seller: "City Motors",
    dateAdded: "2024-05-12",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    created_at: new Date().toISOString()
  }
];

let mockTransactions: any[] = [];
let mockActivities: any[] = [];
let mockNotifications: any[] = [];

// Real-time subscribers
const subscribers: { [key: string]: ((data: any) => void)[] } = {
  vehicles: [],
  transactions: [],
  activities: [],
  notifications: []
};

// Simulate real-time updates
const simulateRealTimeUpdates = () => {
  setInterval(() => {
    // Randomly add new vehicles
    if (Math.random() < 0.3) {
      const newVehicle = {
        id: Date.now(),
        title: `${2024} ${['Toyota', 'Honda', 'Suzuki'][Math.floor(Math.random() * 3)]} ${['Corolla', 'Civic', 'Swift'][Math.floor(Math.random() * 3)]}`,
        price: `PKR ${(Math.random() * 5000000 + 2000000).toLocaleString()}`,
        priceNumber: Math.floor(Math.random() * 5000000 + 2000000),
        location: ['Karachi', 'Lahore', 'Islamabad'][Math.floor(Math.random() * 3)],
        status: Math.random() > 0.5 ? 'active' : 'pending',
        seller: `Dealer ${Math.floor(Math.random() * 100)}`,
        dateAdded: new Date().toISOString().split('T')[0],
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        created_at: new Date().toISOString()
      };
      
      mockVehicles.unshift(newVehicle);
      console.log('Real-time: New vehicle added:', newVehicle);
      
      // Notify subscribers
      subscribers.vehicles.forEach(callback => callback({
        eventType: 'INSERT',
        new: newVehicle,
        old: null
      }));
    }

    // Update existing vehicle views
    if (mockVehicles.length > 0) {
      const randomIndex = Math.floor(Math.random() * mockVehicles.length);
      mockVehicles[randomIndex] = {
        ...mockVehicles[randomIndex],
        views: (mockVehicles[randomIndex].views || 0) + Math.floor(Math.random() * 5)
      };
      
      subscribers.vehicles.forEach(callback => callback({
        eventType: 'UPDATE',
        new: mockVehicles[randomIndex],
        old: null
      }));
    }
  }, 10000); // Update every 10 seconds
};

// Start real-time simulation
if (!isSupabaseConfigured) {
  simulateRealTimeUpdates();
}

// Database operations for vehicles
export const vehicleService = {
  async addVehicle(vehicleData: any) {
    if (!isSupabaseConfigured) {
      const newVehicle = { 
        ...vehicleData, 
        id: Date.now(), 
        created_at: new Date().toISOString() 
      };
      mockVehicles.unshift(newVehicle);
      console.log('Mock: Vehicle added to database:', newVehicle);
      
      // Notify real-time subscribers
      subscribers.vehicles.forEach(callback => callback({
        eventType: 'INSERT',
        new: newVehicle,
        old: null
      }));
      
      return { data: [newVehicle], error: null };
    }

    try {
      const { data, error } = await supabase!
        .from('vehicles')
        .insert([vehicleData])
        .select();
      
      if (error) throw error;
      console.log('Vehicle added to database:', data);
      return { data, error: null };
    } catch (error) {
      console.error('Error adding vehicle:', error);
      return { data: null, error };
    }
  },

  async getAllVehicles() {
    if (!isSupabaseConfigured) {
      console.log('Mock: Fetching all vehicles', mockVehicles);
      return { data: mockVehicles, error: null };
    }

    try {
      const { data, error } = await supabase!
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      return { data: null, error };
    }
  },

  async updateVehicle(id: number, updates: any) {
    if (!isSupabaseConfigured) {
      const index = mockVehicles.findIndex(v => v.id === id);
      if (index !== -1) {
        const oldVehicle = { ...mockVehicles[index] };
        mockVehicles[index] = { ...mockVehicles[index], ...updates };
        console.log('Mock: Vehicle updated in database:', mockVehicles[index]);
        
        // Notify real-time subscribers
        subscribers.vehicles.forEach(callback => callback({
          eventType: 'UPDATE',
          new: mockVehicles[index],
          old: oldVehicle
        }));
        
        return { data: [mockVehicles[index]], error: null };
      }
      return { data: [], error: null };
    }

    try {
      const { data, error } = await supabase!
        .from('vehicles')
        .update(updates)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      console.log('Vehicle updated in database:', data);
      return { data, error: null };
    } catch (error) {
      console.error('Error updating vehicle:', error);
      return { data: null, error };
    }
  },

  async deleteVehicle(id: number) {
    if (!isSupabaseConfigured) {
      const vehicleToDelete = mockVehicles.find(v => v.id === id);
      mockVehicles = mockVehicles.filter(v => v.id !== id);
      console.log('Mock: Vehicle deleted from database:', id);
      
      // Notify real-time subscribers
      if (vehicleToDelete) {
        subscribers.vehicles.forEach(callback => callback({
          eventType: 'DELETE',
          new: null,
          old: vehicleToDelete
        }));
      }
      
      return { error: null };
    }

    try {
      const { error } = await supabase!
        .from('vehicles')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      console.log('Vehicle deleted from database');
      return { error: null };
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      return { error };
    }
  },

  // Real-time subscription
  subscribeToChanges(callback: (payload: any) => void) {
    if (!isSupabaseConfigured) {
      // Add to mock subscribers
      subscribers.vehicles.push(callback);
      console.log('Mock: Subscribed to vehicle changes');
      
      return {
        unsubscribe: () => {
          const index = subscribers.vehicles.indexOf(callback);
          if (index > -1) {
            subscribers.vehicles.splice(index, 1);
          }
          console.log('Mock: Unsubscribed from vehicle changes');
        }
      };
    }

    const channel = supabase!
      .channel('vehicles_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'vehicles'
        },
        callback
      )
      .subscribe();

    return {
      unsubscribe: () => {
        supabase!.removeChannel(channel);
      }
    };
  }
};

// Database operations for transactions
export const transactionService = {
  async addTransaction(transactionData: any) {
    if (!isSupabaseConfigured) {
      const newTransaction = { ...transactionData, id: Date.now(), created_at: new Date().toISOString() };
      mockTransactions.unshift(newTransaction);
      console.log('Mock: Transaction added to database:', newTransaction);
      
      // Mock activity logging
      await activityService.addActivity({
        user_id: transactionData.user_id,
        activity_type: 'purchase',
        description: `Purchased ${transactionData.vehicle_title}`,
        metadata: { transaction_id: newTransaction.id, vehicle_id: transactionData.vehicle_id }
      });
      
      return { data: [newTransaction], error: null };
    }

    try {
      const { data, error } = await supabase!
        .from('transactions')
        .insert([transactionData])
        .select();
      
      if (error) throw error;
      console.log('Transaction added to database:', data);
      
      // Also log activity
      await activityService.addActivity({
        user_id: transactionData.user_id,
        activity_type: 'purchase',
        description: `Purchased ${transactionData.vehicle_title}`,
        metadata: { transaction_id: data[0].id, vehicle_id: transactionData.vehicle_id }
      });
      
      return { data, error: null };
    } catch (error) {
      console.error('Error adding transaction:', error);
      return { data: null, error };
    }
  },

  async getUserTransactions(userId: string) {
    if (!isSupabaseConfigured) {
      const userTransactions = mockTransactions.filter(t => t.user_id === userId);
      console.log('Mock: Fetching user transactions for:', userId, userTransactions);
      return { data: userTransactions, error: null };
    }

    try {
      const { data, error } = await supabase!
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return { data: null, error };
    }
  }
};

// Database operations for user activities
export const activityService = {
  async addActivity(activityData: any) {
    if (!isSupabaseConfigured) {
      const newActivity = { 
        ...activityData, 
        id: Date.now(), 
        created_at: new Date().toISOString() 
      };
      mockActivities.unshift(newActivity);
      console.log('Mock: Activity logged to database:', newActivity);
      return { data: [newActivity], error: null };
    }

    try {
      const { data, error } = await supabase!
        .from('user_activities')
        .insert([{
          ...activityData,
          created_at: new Date().toISOString()
        }])
        .select();
      
      if (error) throw error;
      console.log('Activity logged to database:', data);
      return { data, error: null };
    } catch (error) {
      console.error('Error adding activity:', error);
      return { data: null, error };
    }
  },

  async getUserActivities(userId: string) {
    if (!isSupabaseConfigured) {
      const userActivities = mockActivities.filter(a => a.user_id === userId);
      console.log('Mock: Fetching user activities for:', userId, userActivities);
      return { data: userActivities, error: null };
    }

    try {
      const { data, error } = await supabase!
        .from('user_activities')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching activities:', error);
      return { data: null, error };
    }
  }
};

// Database operations for notifications
export const notificationService = {
  async addNotification(notificationData: any) {
    if (!isSupabaseConfigured) {
      const newNotification = { ...notificationData, id: Date.now(), created_at: new Date().toISOString() };
      mockNotifications.unshift(newNotification);
      console.log('Mock: Notification added to database:', newNotification);
      return { data: [newNotification], error: null };
    }

    try {
      const { data, error } = await supabase!
        .from('notifications')
        .insert([notificationData])
        .select();
      
      if (error) throw error;
      console.log('Notification added to database:', data);
      return { data, error: null };
    } catch (error) {
      console.error('Error adding notification:', error);
      return { data: null, error };
    }
  },

  async getUserNotifications(userId: string) {
    if (!isSupabaseConfigured) {
      const userNotifications = mockNotifications.filter(n => n.user_id === userId);
      console.log('Mock: Fetching user notifications for:', userId, userNotifications);
      return { data: userNotifications, error: null };
    }

    try {
      const { data, error } = await supabase!
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return { data: null, error };
    }
  },

  async markAsRead(notificationId: number) {
    if (!isSupabaseConfigured) {
      const index = mockNotifications.findIndex(n => n.id === notificationId);
      if (index !== -1) {
        mockNotifications[index].read = true;
      }
      console.log('Mock: Notification marked as read:', notificationId);
      return { error: null };
    }

    try {
      const { error } = await supabase!
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);
      
      if (error) throw error;
      console.log('Notification marked as read');
      return { error: null };
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return { error };
    }
  }
};
