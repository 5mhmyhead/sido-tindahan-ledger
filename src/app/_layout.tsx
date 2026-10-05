import AppTabs from "@/components/app-tabs";
import { SignIn } from "@/components/sign-in";
import { useSession } from "@/hooks/use-session";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const session = useSession();

  return (
    <>
      {session === undefined && (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {session === null && <SignIn />}
      {session && <AppTabs />}
      <StatusBar style="dark" />
    </>
  );
}
