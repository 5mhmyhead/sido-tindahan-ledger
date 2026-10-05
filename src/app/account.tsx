import { StorePhoto } from "@/components/store-photo";
import { useProfile } from "@/hooks/use-profile";
import { supabase } from "@/lib/supabase";
import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountScreen() {
  const profile = useProfile();
  
  return (
    <SafeAreaView style={{ flex: 1, padding: 24, gap: 12 }}>
      <Text style={styles.emailText}>{profile?.email}</Text>
      <Text style={styles.roleText}>Role: {profile?.role}</Text>
    
      <Pressable
        onPress={() => supabase.auth.signOut()}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </Pressable>
      
      {profile?.role === "admin" && <StorePhoto />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  emailText: {
    fontSize: 18,
    fontWeight: "600",
  },
  roleText: {
    fontSize: 14,
    color: "#8e8e93",
    textTransform: "capitalize",
    marginBottom: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
  },
  buttonText: {
    color: "#fff",
  },
});