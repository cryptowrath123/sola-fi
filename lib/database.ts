import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

// Types for our data structures
export interface UserProfile {
  uid: string;
  email: string;
  walletAddress?: string;
  displayName?: string;
  createdAt: Timestamp;
  lastLoginAt: Timestamp;
}

export interface Transaction {
  id?: string;
  fromUserId: string;
  toUserId?: string;
  toEmail?: string;
  toWalletAddress?: string;
  cryptocurrency: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  transactionHash?: string;
  createdAt: Timestamp;
  completedAt?: Timestamp;
  type: "send" | "receive" | "buy";
}

export interface WalletBalance {
  userId: string;
  cryptocurrency: string;
  balance: number;
  lastUpdated: Timestamp;
}

// User Profile Functions
export const createUserProfile = async (
  uid: string,
  email: string,
  additionalData?: Partial<UserProfile>
): Promise<void> => {
  try {
    const userRef = doc(db, "users", uid);
    const userData = {
      uid,
      email,
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
      ...additionalData,
    };

    await setDoc(userRef, userData);
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

export const getUserProfile = async (
  uid: string
): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (
  uid: string,
  updates: Partial<UserProfile>
): Promise<void> => {
  try {
    const userRef = doc(db, "users", uid);
    // Convert Date to serverTimestamp for lastLoginAt
    const updateData: any = { ...updates };
    if (updates.lastLoginAt) {
      updateData.lastLoginAt = serverTimestamp();
    }
    await updateDoc(userRef, updateData);
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const getUserByEmail = async (
  email: string
): Promise<UserProfile | null> => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email), limit(1));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data() as UserProfile;
  }
  return null;
};

// Transaction Functions
export const createTransaction = async (
  transactionData: Omit<Transaction, "id" | "createdAt">
): Promise<string> => {
  const transactionsRef = collection(db, "transactions");
  const transaction: Omit<Transaction, "id"> = {
    ...transactionData,
    createdAt: serverTimestamp() as Timestamp,
  };

  const docRef = await addDoc(transactionsRef, transaction);
  return docRef.id;
};

export const updateTransaction = async (
  transactionId: string,
  updates: Partial<Transaction>
): Promise<void> => {
  const transactionRef = doc(db, "transactions", transactionId);
  await updateDoc(transactionRef, updates);
};

export const getUserTransactions = async (
  userId: string,
  limitCount: number = 10
): Promise<Transaction[]> => {
  const transactionsRef = collection(db, "transactions");
  const q = query(
    transactionsRef,
    where("fromUserId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Transaction[];
};

export const getReceivedTransactions = async (
  userId: string,
  limitCount: number = 10
): Promise<Transaction[]> => {
  const transactionsRef = collection(db, "transactions");
  const q = query(
    transactionsRef,
    where("toUserId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Transaction[];
};

// Wallet Balance Functions
export const updateWalletBalance = async (
  userId: string,
  cryptocurrency: string,
  balance: number
): Promise<void> => {
  const balanceRef = doc(db, "walletBalances", `${userId}_${cryptocurrency}`);
  const balanceData: WalletBalance = {
    userId,
    cryptocurrency,
    balance,
    lastUpdated: serverTimestamp() as Timestamp,
  };

  await setDoc(balanceRef, balanceData);
};

export const getWalletBalance = async (
  userId: string,
  cryptocurrency: string
): Promise<number> => {
  const balanceRef = doc(db, "walletBalances", `${userId}_${cryptocurrency}`);
  const balanceSnap = await getDoc(balanceRef);

  if (balanceSnap.exists()) {
    const data = balanceSnap.data() as WalletBalance;
    return data.balance;
  }
  return 0;
};

export const getAllWalletBalances = async (
  userId: string
): Promise<WalletBalance[]> => {
  const balancesRef = collection(db, "walletBalances");
  const q = query(balancesRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => doc.data()) as WalletBalance[];
};

// Email-to-Wallet Functions
export const sendToEmail = async (
  fromUserId: string,
  toEmail: string,
  cryptocurrency: string,
  amount: number
): Promise<{ success: boolean; message: string; transactionId?: string }> => {
  try {
    // Check if the email is registered
    const recipientUser = await getUserByEmail(toEmail);

    if (!recipientUser) {
      return {
        success: false,
        message: "Email address is not registered on our platform",
      };
    }

    // Create the transaction
    const transactionId = await createTransaction({
      fromUserId,
      toUserId: recipientUser.uid,
      toEmail,
      cryptocurrency,
      amount,
      status: "pending",
      type: "send",
    });

    // In a real app, you would:
    // 1. Deduct from sender's balance
    // 2. Add to recipient's balance
    // 3. Update transaction status to "completed"

    // For now, we'll just mark it as completed
    await updateTransaction(transactionId, {
      status: "completed",
      completedAt: serverTimestamp() as Timestamp,
    });

    return {
      success: true,
      message: `Successfully sent ${amount} ${cryptocurrency} to ${toEmail}`,
      transactionId,
    };
  } catch (error) {
    console.error("Error sending to email:", error);
    return {
      success: false,
      message: "Failed to send transaction. Please try again.",
    };
  }
};

// Analytics Functions
export const getUserStats = async (userId: string) => {
  const [sentTransactions, receivedTransactions, balances] = await Promise.all([
    getUserTransactions(userId, 100),
    getReceivedTransactions(userId, 100),
    getAllWalletBalances(userId),
  ]);

  const totalSent = sentTransactions
    .filter((tx) => tx.status === "completed")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalReceived = receivedTransactions
    .filter((tx) => tx.status === "completed")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalBalance = balances.reduce((sum, balance) => {
    // You'd need to convert each crypto to USD here
    return sum + balance.balance;
  }, 0);

  return {
    totalSent,
    totalReceived,
    totalBalance,
    transactionCount: sentTransactions.length + receivedTransactions.length,
    balances,
  };
};
