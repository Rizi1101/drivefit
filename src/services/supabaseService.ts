
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase is properly configured
const isSupabaseConfigured = supabaseUrl && supabaseKey;

// Create Supabase client only if configured, otherwise use mock
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Mock functions for when Supabase is not configured
const createMockResponse = (data: any = null) => ({
  data,
  error: null
});

const createMockSubscription = () => ({
  subscribe: () => ({
    unsubscribe: () => {}
  })
});

// In-memory storage for demo purposes when Supabase is not configured
let mockVehicles: any[] = [];
let mockTransactions: any[] = [];
let mockActivities: any[] = [];
let mockNotifications: any[] = [];

// Database operations for vehicles
export const vehicleService = {
  // Add new vehicle to database
  async addVehicle(vehicleData: any) {
    if (!isSupabaseConfigured) {
      const newVehicle = { ...vehicleData, id: Date.now(), created_at: new Date().toISOString() };
      mockVehicles.unshift(newVehicle);
      console.log('Mock: Vehicle added to database:', newVehicle);
      return createMockResponse([newVehicle]);
    }

    try {
      const { data, error } = await supabase!
        .from('vehicles')
        .insert([vehicleData])
        .select();
      
      if (error) throw error;
      console.log('Vehicle added to database:', data);
      return data;
    } catch (error) {
      console.error('Error adding vehicle:', error);
      throw error;
    }
  },

  // Get all vehicles from database
  async getAllVehicles() {
    if (!isSupabaseConfigured) {
      console.log('Mock: Fetching all vehicles', mockVehicles);
      return createMockResponse(mockVehicles);
    }

    try {
      const { data, error } = await supabase!
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      throw error;
    }
  },

  // Update vehicle in database
  async updateVehicle(id: number, updates: any) {
    if (!isSupabaseConfigured) {
      const index = mockVehicles.findIndex(v => v.id === id);
      if (index !== -1) {
        mockVehicles[index] = { ...mockVehicles[index], ...updates };
        console.log('Mock: Vehicle updated in database:', mockVehicles[index]);
        return createMockResponse([mockVehicles[index]]);
      }
      return createMockResponse([]);
    }

    try {
      const { data, error } = await supabase!
        .from('vehicles')
        .update(updates)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      console.log('Vehicle updated in database:', data);
      return data;
    } catch (error) {
      console.error('Error updating vehicle:', error);
      throw error;
    }
  },

  // Delete vehicle from database
  async deleteVehicle(id: number) {
    if (!isSupabaseConfigured) {
      mockVehicles = mockVehicles.filter(v => v.id !== id);
      console.log('Mock: Vehicle deleted from database:', id);
      return true;
    }

    try {
      const { error } = await supabase!
        .from('vehicles')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      console.log('Vehicle deleted from database');
      return true;
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      throw error;
    }
  }
};

// Database operations for transactions
export const transactionService = {
  // Add new transaction to database
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
      
      return createMockResponse([newTransaction]);
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
      
      return data;
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  },

  // Get user transactions
  async getUserTransactions(userId: string) {
    if (!isSupabaseConfigured) {
      const userTransactions = mockTransactions.filter(t => t.user_id === userId);
      console.log('Mock: Fetching user transactions for:', userId, userTransactions);
      return createMockResponse(userTransactions);
    }

    try {
      const { data, error } = await supabase!
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  }
};

// Database operations for user activities
export const activityService = {
  // Add new activity to database
  async addActivity(activityData: any) {
    if (!isSupabaseConfigured) {
      const newActivity = { 
        ...activityData, 
        id: Date.now(), 
        created_at: new Date().toISOString() 
      };
      mockActivities.unshift(newActivity);
      console.log('Mock: Activity logged to database:', newActivity);
      return createMockResponse([newActivity]);
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
      return data;
    } catch (error) {
      console.error('Error adding activity:', error);
      throw error;
    }
  },

  // Get user activities
  async getUserActivities(userId: string) {
    if (!isSupabaseConfigured) {
      const userActivities = mockActivities.filter(a => a.user_id === userId);
      console.log('Mock: Fetching user activities for:', userId, userActivities);
      return createMockResponse(userActivities);
    }

    try {
      const { data, error } = await supabase!
        .from('user_activities')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw error;
    }
  }
};

// Database operations for notifications
export const notificationService = {
  // Add notification to database
  async addNotification(notificationData: any) {
    if (!isSupabaseConfigured) {
      const newNotification = { ...notificationData, id: Date.now(), created_at: new Date().toISOString() };
      mockNotifications.unshift(newNotification);
      console.log('Mock: Notification added to database:', newNotification);
      return createMockResponse([newNotification]);
    }

    try {
      const { data, error } = await supabase!
        .from('notifications')
        .insert([notificationData])
        .select();
      
      if (error) throw error;
      console.log('Notification added to database:', data);
      return data;
    } catch (error) {
      console.error('Error adding notification:', error);
      throw error;
    }
  },

  // Get user notifications
  async getUserNotifications(userId: string) {
    if (!isSupabaseConfigured) {
      const userNotifications = mockNotifications.filter(n => n.user_id === userId);
      console.log('Mock: Fetching user notifications for:', userId, userNotifications);
      return createMockResponse(userNotifications);
    }

    try {
      const { data, error } = await supabase!
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  // Mark notification as read
  async markAsRead(notificationId: number) {
    if (!isSupabaseConfigured) {
      const index = mockNotifications.findIndex(n => n.id === notificationId);
      if (index !== -1) {
        mockNotifications[index].read = true;
      }
      console.log('Mock: Notification marked as read:', notificationId);
      return;
    }

    try {
      const { error } = await supabase!
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);
      
      if (error) throw error;
      console.log('Notification marked as read');
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }
};
