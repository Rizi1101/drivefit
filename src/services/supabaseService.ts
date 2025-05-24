
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

// Database operations for vehicles
export const vehicleService = {
  // Add new vehicle to database
  async addVehicle(vehicleData: any) {
    if (!isSupabaseConfigured) {
      console.log('Mock: Vehicle added to database:', vehicleData);
      return createMockResponse([{ ...vehicleData, id: Date.now() }]);
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
      console.log('Mock: Fetching all vehicles');
      return createMockResponse([]);
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
      console.log('Mock: Vehicle updated in database:', { id, updates });
      return createMockResponse([{ id, ...updates }]);
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
  },

  // Subscribe to real-time vehicle changes
  subscribeToVehicleChanges(callback: (payload: any) => void) {
    if (!isSupabaseConfigured) {
      console.log('Mock: Subscribing to vehicle changes');
      return createMockSubscription();
    }

    return supabase!
      .channel('vehicles')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'vehicles' }, callback)
      .subscribe();
  }
};

// Database operations for transactions
export const transactionService = {
  // Add new transaction to database
  async addTransaction(transactionData: any) {
    if (!isSupabaseConfigured) {
      console.log('Mock: Transaction added to database:', transactionData);
      
      // Mock activity logging
      await activityService.addActivity({
        user_id: transactionData.user_id,
        activity_type: 'purchase',
        description: `Purchased ${transactionData.vehicle_title}`,
        metadata: { transaction_id: Date.now(), vehicle_id: transactionData.vehicle_id }
      });
      
      return createMockResponse([{ ...transactionData, id: Date.now() }]);
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
      console.log('Mock: Fetching user transactions for:', userId);
      return createMockResponse([]);
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
      console.log('Mock: Activity logged to database:', activityData);
      return createMockResponse([{ ...activityData, id: Date.now(), created_at: new Date().toISOString() }]);
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
      console.log('Mock: Fetching user activities for:', userId);
      return createMockResponse([]);
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
      console.log('Mock: Notification added to database:', notificationData);
      return createMockResponse([{ ...notificationData, id: Date.now() }]);
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
      console.log('Mock: Fetching user notifications for:', userId);
      return createMockResponse([]);
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
  },

  // Subscribe to real-time notifications
  subscribeToNotifications(userId: string, callback: (payload: any) => void) {
    if (!isSupabaseConfigured) {
      console.log('Mock: Subscribing to notifications for user:', userId);
      return createMockSubscription();
    }

    return supabase!
      .channel('notifications')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${userId}` }, 
        callback
      )
      .subscribe();
  }
};
