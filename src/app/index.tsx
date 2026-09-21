import { ShareBar } from "@/components/share-bar";
import { summarise } from "@/data/summary";
import { useCustomers } from "@/hooks/use-customers";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ color: "#777" }}>{label}</Text>
      <Text style={{ fontSize: 24, fontWeight: "600" }}>{value}</Text>
    </View>
  );
}

export default function Index() {
  const router = useRouter();
  const { status, customers, problem, retry } = useCustomers();

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
          onPress={retry}
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

  const summary = summarise(customers);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ padding: 24, gap: 12 }}>
        <Text style={{ color: "#777" }}>Customer Service App</Text>
        <Text style={{ fontSize: 42, fontWeight: "700", marginBottom: 12 }}>
          Home Page
        </Text>
        <View style={styles.card}>
          <View style={styles.statRow}>
            <Stat label="Total owed" value={`₱ ${summary.total.toFixed(2)}`} />
            <Stat
              label="Average owed"
              value={`₱ ${summary.average.toFixed(2)}`}
            />
          </View>
          <View style={styles.statRow}>
            <Stat
              label="Still owing"
              value={`${summary.owing} of ${summary.count}`}
            />
            <Stat label="Settled" value={String(summary.settled)} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={{ fontSize: 14, color: "#8e8e93" }}>
            Share of what is owed
          </Text>
          {summary.ranked.map((c) => (
            <ShareBar
              key={c.id}
              name={c.name}
              balance={c.balance}
              share={c.share}
            />
          ))}
        </View>
        <Pressable
          onPress={() => router.push("/customers")}
          style={styles.button}
        >
          <Text style={{ color: "#fff" }}>View Customers</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f2f2f7",
    borderRadius: 24,
    padding: 20,
    gap: 20,
  },
  statRow: { flexDirection: "row", gap: 16 },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
