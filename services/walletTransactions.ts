import { supabase } from './supabaseClient';
import { solanaWallet } from './solanaWallet';

/**
 * WalletTransactionService provides functionality for managing wallet transactions
 * and associating wallets with user accounts in Supabase
 */
export class WalletTransactionService {
  /**
   * Associate a wallet with a user account in Supabase
   * @param userId User ID
   * @param walletAddress Wallet public address
   * @param email User's email
   */
  async associateWalletWithUser(userId: string, walletAddress: string, email?: string) {
    try {
      // Check if user already has a wallet
      const { data: existingWallet, error: fetchError } = await supabase
        .from('user_profiles')
        .select('wallet_address')
        .eq('user_id', userId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
        throw fetchError;
      }

      if (existingWallet) {
        // Update existing wallet
        const { error: updateError } = await supabase
          .from('user_profiles')
          .update({ wallet_address: walletAddress })
          .eq('user_id', userId);

        if (updateError) throw updateError;
      } else {
        // Create new wallet association
        const { error: insertError } = await supabase
          .from('user_profiles')
          .insert({
            user_id: userId,
            wallet_address: walletAddress,
            email,
          });

        if (insertError) throw insertError;
      }

      return { success: true };
    } catch (error) {
      console.error('Error associating wallet with user:', error);
      throw error;
    }
  }

  /**
   * Record a wallet transaction in Supabase
   * @param userId User ID
   * @param walletAddress Wallet address
   * @param signature Transaction signature
   * @param amount Transaction amount
   * @param type Transaction type ('send', 'receive', 'airdrop', etc.)
   * @param status Transaction status ('pending', 'confirmed', 'failed')
   */
  async recordTransaction(userId: string, walletAddress: string, signature: string, amount: number, type: string, status: string) {
    try {
      const { error } = await supabase
        .from('wallet_transactions')
        .insert({
          user_id: userId,
          wallet_address: walletAddress,
          transaction_signature: signature,
          amount,
          transaction_type: type,
          status,
        });

      if (error) throw error;

      return { success: true };
    } catch (error) {
      console.error('Error recording transaction:', error);
      throw error;
    }
  }

  /**
   * Get all transactions for a user's wallet
   * @param userId User ID
   * @returns Array of transactions
   */
  async getUserTransactions(userId: string) {
    try {
      const { data, error } = await supabase
        .from('wallet_transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Error getting user transactions:', error);
      throw error;
    }
  }

  /**
   * Request an airdrop and record the transaction
   * @param userId User ID
   * @param walletAddress Wallet address
   * @param amount Amount of SOL to request (default: 1)
   */
  async requestAirdropAndRecord(userId: string, walletAddress: string, amount = 1) {
    try {
      // Request airdrop
      const signature = await solanaWallet.requestAirdrop(walletAddress, amount);
      
      // Record transaction
      await this.recordTransaction(
        userId,
        walletAddress,
        signature,
        amount,
        'airdrop',
        'confirmed'
      );
      
      return { success: true, signature };
    } catch (error) {
      console.error('Error requesting airdrop and recording transaction:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const walletTransactions = new WalletTransactionService();