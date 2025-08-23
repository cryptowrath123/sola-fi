import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { secureStorage } from './secureStorage';

// Constants
const NETWORK = 'testnet'; // Can be changed to 'mainnet-beta' for production

/**
 * SolanaWalletService provides functionality for managing Solana wallets
 * on testnet (can be switched to mainnet for production)
 */
export class SolanaWalletService {
  private connection: Connection;

  constructor() {
    // Initialize connection to Solana testnet
    this.connection = new Connection(clusterApiUrl(NETWORK), 'confirmed');
  }

  /**
   * Creates a new Solana wallet
   * @returns Object containing the wallet's public key and private key
   */
  async createWallet() {
    try {
      // Generate a new Solana keypair
      const keypair = Keypair.generate();
      const publicKey = keypair.publicKey.toString();
      const privateKey = Buffer.from(keypair.secretKey).toString('hex');

      return {
        publicKey,
        privateKey,
      };
    } catch (error) {
      console.error('Error creating wallet:', error);
      throw new Error('Failed to create wallet');
    }
  }

  /**
   * Retrieves wallet balance
   * @param publicKey The wallet's public key
   * @returns The wallet balance in SOL
   */
  async getBalance(publicKey: string) {
    try {
      const pubKey = new PublicKey(publicKey);
      const balance = await this.connection.getBalance(pubKey);
      return balance / LAMPORTS_PER_SOL; // Convert lamports to SOL
    } catch (error) {
      console.error('Error getting balance:', error);
      throw new Error('Failed to get wallet balance');
    }
  }

  /**
   * Securely stores the wallet's private key
   * @param userId The user's ID for associating with the wallet
   * @param privateKey The wallet's private key
   */
  async storeWalletKey(userId: string, privateKey: string) {
    try {
      // Store the private key securely using our secure storage service
      await secureStorage.storeWalletPrivateKey(userId, privateKey);
      
      // If we have a public key, store that too
      const keypair = this.getKeypairFromPrivateKey(privateKey);
      const publicKey = keypair.publicKey.toString();
      await secureStorage.storeWalletPublicKey(userId, publicKey);
    } catch (error) {
      console.error('Error storing wallet key:', error);
      throw new Error('Failed to securely store wallet key');
    }
  }

  /**
   * Retrieves the stored wallet's private key
   * @param userId The user's ID associated with the wallet
   * @returns The wallet's private key
   */
  async getWalletKey(userId: string) {
    try {
      return await secureStorage.getWalletPrivateKey(userId);
    } catch (error) {
      console.error('Error retrieving wallet key:', error);
      throw new Error('Failed to retrieve wallet key');
    }
  }
  
  /**
   * Retrieves the stored wallet's public key
   * @param userId The user's ID associated with the wallet
   * @returns The wallet's public key
   */
  async getWalletPublicKey(userId: string) {
    try {
      return await secureStorage.getWalletPublicKey(userId);
    } catch (error) {
      console.error('Error retrieving wallet public key:', error);
      throw new Error('Failed to retrieve wallet public key');
    }
  }

  /**
   * Reconstructs a keypair from a stored private key
   * @param privateKey The wallet's private key in hex format
   * @returns A Solana Keypair object
   */
  getKeypairFromPrivateKey(privateKey: string) {
    try {
      const secretKey = Buffer.from(privateKey, 'hex');
      return Keypair.fromSecretKey(secretKey);
    } catch (error) {
      console.error('Error reconstructing keypair:', error);
      throw new Error('Failed to reconstruct keypair from private key');
    }
  }

  /**
   * Request airdrop of SOL to the specified wallet (testnet only)
   * @param publicKey The wallet's public key
   * @param amount Amount of SOL to request (max 2 SOL per request on testnet)
   * @returns Transaction signature
   */
  async requestAirdrop(publicKey: string, amount = 1) {
    try {
      if (NETWORK !== 'testnet' && NETWORK !== 'devnet') {
        throw new Error('Airdrops are only available on testnet or devnet');
      }

      const pubKey = new PublicKey(publicKey);
      const signature = await this.connection.requestAirdrop(
        pubKey,
        amount * LAMPORTS_PER_SOL
      );

      // Wait for confirmation
      await this.connection.confirmTransaction(signature);
      return signature;
    } catch (error) {
      console.error('Error requesting airdrop:', error);
      throw new Error('Failed to request SOL airdrop');
    }
  }
}

// Export a singleton instance
export const solanaWallet = new SolanaWalletService();