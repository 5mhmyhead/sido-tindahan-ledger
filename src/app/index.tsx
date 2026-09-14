import { SEED } from "@/data/customers";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const toCustomers = () => {
    router.push("/customers");
  };

  const [customers] = useState(SEED);
  const total = customers.reduce((sum, c) => sum + c.balance, 0);

  return (
    <SafeAreaView style={{ flex: 1, padding: 24, gap: 12, justifyContent: "center", paddingBottom: 80}}>
      <Text style={{ color: "#777" }}>Customer Service App</Text>
      <Text style={{ fontSize: 42, fontWeight: "700", marginBottom: 12 }}>Home Page</Text>
      
      <View style={{ gap: 8 }}>
        <View style={{ backgroundColor: "#ddd", padding: 16, borderRadius: 12, gap: 12 }}>
          <Text style={{ color: "#777" }}>Total owed</Text>
          <Text style={{ fontSize: 28, fontWeight: "600" }}>₱ {total}</Text>
        </View>

        <View style={{ backgroundColor: "#ddd", padding: 16, borderRadius: 12, gap: 12 }}>
          <Text style={{ color: "#777" }}>Customers with a balance</Text>
          <Text style={{ fontSize: 28, fontWeight: "600" }}>2 of 3</Text>
        </View>
      </View>

      <Pressable onPress={toCustomers} style={{ backgroundColor: "#007AFF", paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#fff" }}>
          View Customers
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}