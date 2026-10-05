import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomerRow } from "@/components/customer-row";

import { AddCustomerModal } from "@/components/add-customer-modal";
import { useCustomers } from "@/hooks/use-customers";
import { useProfile } from "@/hooks/use-profile";
import { router } from "expo-router";
import { useState } from "react";

export default function CustomersScreen() {
  const { status, customers, problem, retry } = useCustomers();
  const profile = useProfile();

  const [attempt, setAttempt] = useState(0);
  const [query, setQuery] = useState("");
  const [adding, setAdding] = useState(false);

  if (status === "loading")
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 10 }}>
          Loading customers
        </Text>
      </View>
    );

  if (status === "error")
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>{problem}</Text>
        <Pressable
          onPress={() => setAttempt(attempt + 1)}
          style={{
            marginTop: 10,
            backgroundColor: "#007AFF",
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff" }}>Try again</Text>
        </Pressable>
      </View>
    );

  if (status === "empty")
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          No customers yet.
        </Text>
      </View>
    );

  const shown = customers.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()),
  );
  const total = shown.reduce((sum, c) => sum + c.balance, 0);

  return (
    <SafeAreaView style={{ flex: 1, padding: 24, gap: 12 }}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search for a customer..."
        style={{ borderWidth: 1, borderRadius: 8, padding: 12 }}
      />
      {profile?.role === "admin" && (
        <Pressable
          onPress={() => setAdding(true)}
          style={{
            backgroundColor: "#007AFF",
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff" }}>Add Customer</Text>
        </Pressable>
      )} 
      <AddCustomerModal
        visible={adding}
        onClose={() => setAdding(false)}
        onAdded={retry}
      />
      <Text style={{ fontSize: 18 }}>Total owed: ₱ {total.toFixed(2)}</Text>
      <FlatList
        data={shown}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => (
          <CustomerRow
            name={item.name}
            balance={item.balance}
            onPress={() => router.push(`/customers/${item.id}`)}
          />
        )}
        ListEmptyComponent={<Text>No customers match "{query}".</Text>}
      />
    </SafeAreaView>
  );
}
