import { Customer, fetchCustomer } from "@/data/customers";
import { problemFor, Status } from "@/data/problem";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function CustomerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [status, setStatus] = useState<Status>("loading");
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [problem, setProblem] = useState("");

  useEffect(() => {
    let live = true;
    fetchCustomer(id)
      .then((row) => {
        if (live) {
          setCustomer(row);
          setStatus("content");
        }
      })
      .catch((e) => {
        if (live) {
          setProblem(problemFor(e));
          setStatus("error");
        }
      });
    return () => {
      live = false;
    };
  }, [id]);

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
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          No customers yet.
        </Text>
      </View>
    );

  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: "#fff" }}>
      <Stack.Screen options={{ title: customer!.name }} />
      <Text style={{ fontSize: 40, fontWeight: "700" }}>
        ₱ {customer!.balance.toFixed(2)}
      </Text>
      <Text style={{ fontSize: 14, fontWeight: "600", color: "#999" }}>
        Last paid {customer!.lastPaid}
      </Text>
    </View>
  );
}
