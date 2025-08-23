import { User } from '@supabase/supabase-js';
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabaseAuth } from "../../services/supabaseAuth";
import { supabase } from "../../services/supabaseClient";

interface UserProfile {
  id: string;
  user_id: string;
  wallet_address: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userProfile: UserProfile | null;
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
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to load user and profile
    const loadUserAndProfile = async () => {
      try {
        // Get current session
        const session = await supabaseAuth.getCurrentSession();
        
        if (session) {
          // Get current user
          const currentUser = await supabaseAuth.getCurrentUser();
          setUser(currentUser);
          
          if (currentUser) {
            // Get user profile
            const profile = await supabaseAuth.getUserProfile(currentUser.id);
            setUserProfile(profile);
          }
        }
      } catch (error) {
        console.error("Error loading user and profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserAndProfile();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          const profile = await supabaseAuth.getUserProfile(session.user.id);
          setUserProfile(profile);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setUserProfile(null);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    loading,
    userProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
