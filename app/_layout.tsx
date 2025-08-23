import { Slot, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./global.css";

const InitialLayout = () => {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inDashboardGroup = segments[0] === "(dashboard)";

    if (user && !inDashboardGroup) {
      router.replace("/(dashboard)" as any);
    } else if (!user && inDashboardGroup) {
      router.replace("/auth/login");
    }
  }, [user, loading, segments, router]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <InitialLayout />
    </AuthProvider>
  );
}
