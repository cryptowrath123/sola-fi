import { secureStorage } from './secureStorage';
import { solanaWallet } from './solanaWallet';
import { supabase } from './supabaseClient';

// Constants
const USER_SESSION_KEY = 'USER_SESSION';

/**
 * SupabaseAuthService provides functionality for user authentication
 * and managing user data including Solana wallet information
 */
export class SupabaseAuthService {
  /**
   * Register a new user and create a Solana wallet for them
   * @param email User's email
   * @param password User's password
   * @returns User data including their new wallet information
   */
  async registerWithEmail(email: string, password: string) {
    try {
      // Register user with Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('User registration failed');

      // Create a Solana wallet for the user
      const walletData = await solanaWallet.createWallet();
      
      // Store the wallet's private key securely
      await solanaWallet.storeWalletKey(authData.user.id, walletData.privateKey);

      // Store wallet public key in Supabase
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          user_id: authData.user.id,
          wallet_address: walletData.publicKey,
          email: email,
          created_at: new Date().toISOString(),
        });

      if (profileError) throw profileError;

      return {
        user: authData.user,
        walletAddress: walletData.publicKey,
      };
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  }

  /**
   * Log in an existing user
   * @param email User's email
   * @param password User's password
   * @returns User session data
   */
  async loginWithEmail(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Store session for later use
      await this.storeSession(data.session);

      return data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  /**
   * Log out the current user
   */
  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Clear stored session
      await secureStorage.deleteItem(USER_SESSION_KEY);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }

  /**
   * Get the current user session
   * @returns Current session or null if not logged in
   */
  async getCurrentSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session;
    } catch (error) {
      console.error('Error getting current session:', error);
      return null;
    }
  }

  /**
   * Get the current user
   * @returns Current user or null if not logged in
   */
  async getCurrentUser() {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data.user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Get user profile including wallet information
   * @param userId User ID
   * @returns User profile data
   */
  async getUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  }

  /**
   * Store user session securely
   * @param session User session object
   */
  private async storeSession(session: any) {
    try {
      await secureStorage.storeItem(
        USER_SESSION_KEY,
        JSON.stringify(session)
      );
    } catch (error) {
      console.error('Error storing session:', error);
    }
  }

  /**
   * Get stored user session
   * @returns Stored session or null if not found
   */
  private async getStoredSession() {
    try {
      const sessionStr = await secureStorage.getItem(USER_SESSION_KEY);
      return sessionStr ? JSON.parse(sessionStr) : null;
    } catch (error) {
      console.error('Error getting stored session:', error);
      return null;
    }
  }

  /**
   * Send password reset email to user
   * @param email User's email address
   */
  async resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'sola-fi://reset-password',
      });
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error sending password reset:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const supabaseAuth = new SupabaseAuthService();