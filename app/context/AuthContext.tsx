import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
} from "../../lib/database";
import { auth } from "../../lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userProfile: any | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  userProfile: null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        try {
          // Check if user profile exists
          let profile = await getUserProfile(user.uid);

          if (!profile) {
            // Create new user profile
            await createUserProfile(user.uid, user.email || "");
            profile = await getUserProfile(user.uid);
          } else {
            // Update last login time
            await updateUserProfile(user.uid, {
              lastLoginAt: new Date() as any,
            });
          }

          setUserProfile(profile);
        } catch (error) {
          console.error("Error managing user profile:", error);
          // For now, set userProfile to null to prevent app crashes
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    userProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
