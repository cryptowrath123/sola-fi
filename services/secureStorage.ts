import * as SecureStore from 'expo-secure-store';

// Constants for storage keys
const WALLET_PRIVATE_KEY_PREFIX = 'WALLET_PRIVATE_KEY_';
const WALLET_PUBLIC_KEY_PREFIX = 'WALLET_PUBLIC_KEY_';

/**
 * SecureStorageService provides methods for securely storing and retrieving
 * sensitive information like wallet keys using expo-secure-store
 */
export class SecureStorageService {
  /**
   * Store a wallet's private key securely
   * @param userId User ID to associate with the wallet
   * @param privateKey Wallet private key
   */
  async storeWalletPrivateKey(userId: string, privateKey: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(
        `${WALLET_PRIVATE_KEY_PREFIX}${userId}`,
        privateKey
      );
    } catch (error) {
      console.error('Error storing wallet private key:', error);
      throw new Error('Failed to securely store wallet private key');
    }
  }

  /**
   * Retrieve a wallet's private key
   * @param userId User ID associated with the wallet
   * @returns The wallet's private key or null if not found
   */
  async getWalletPrivateKey(userId: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(`${WALLET_PRIVATE_KEY_PREFIX}${userId}`);
    } catch (error) {
      console.error('Error retrieving wallet private key:', error);
      throw new Error('Failed to retrieve wallet private key');
    }
  }

  /**
   * Store a wallet's public key
   * @param userId User ID to associate with the wallet
   * @param publicKey Wallet public key
   */
  async storeWalletPublicKey(userId: string, publicKey: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(
        `${WALLET_PUBLIC_KEY_PREFIX}${userId}`,
        publicKey
      );
    } catch (error) {
      console.error('Error storing wallet public key:', error);
      throw new Error('Failed to store wallet public key');
    }
  }

  /**
   * Retrieve a wallet's public key
   * @param userId User ID associated with the wallet
   * @returns The wallet's public key or null if not found
   */
  async getWalletPublicKey(userId: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(`${WALLET_PUBLIC_KEY_PREFIX}${userId}`);
    } catch (error) {
      console.error('Error retrieving wallet public key:', error);
      throw new Error('Failed to retrieve wallet public key');
    }
  }

  /**
   * Delete all wallet keys for a user
   * @param userId User ID
   */
  async deleteWalletKeys(userId: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(`${WALLET_PRIVATE_KEY_PREFIX}${userId}`);
      await SecureStore.deleteItemAsync(`${WALLET_PUBLIC_KEY_PREFIX}${userId}`);
    } catch (error) {
      console.error('Error deleting wallet keys:', error);
      throw new Error('Failed to delete wallet keys');
    }
  }

  /**
   * Store any key-value pair securely
   * @param key Storage key
   * @param value Value to store
   */
  async storeItem(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error(`Error storing item with key ${key}:`, error);
      throw new Error(`Failed to securely store item with key ${key}`);
    }
  }

  /**
   * Retrieve a stored value
   * @param key Storage key
   * @returns Stored value or null if not found
   */
  async getItem(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error(`Error retrieving item with key ${key}:`, error);
      throw new Error(`Failed to retrieve item with key ${key}`);
    }
  }

  /**
   * Delete a stored value
   * @param key Storage key
   */
  async deleteItem(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error(`Error deleting item with key ${key}:`, error);
      throw new Error(`Failed to delete item with key ${key}`);
    }
  }
}

// Export a singleton instance
export const secureStorage = new SecureStorageService();