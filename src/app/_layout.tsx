import AppTabs from "@/components/app-tabs";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <AppTabs />
      <StatusBar style="dark" />
    </>
  );
}
