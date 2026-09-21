import { Text, View } from "react-native";

type ShareBarProps = { name: string; balance: number; share: number };

export function ShareBar({ name, balance, share }: ShareBarProps) {
  return (
    <View style={{ gap: 6 }}>
      <Text style={{ fontSize: 16, fontWeight: "700" }}>{name}</Text>
      <Text style={{ fontSize: 12, color: "#999" }}>
        ₱ {balance.toFixed(2)} · {Math.round(share * 100)}%
      </Text>
      <View
        style={{
          height: 8,
          borderRadius: 4,
          backgroundColor: "#e5e5ea",
          overflow: "hidden",
        }}
      >
        <View
          style={{
            height: 8,
            width: `${Math.max(share * 100, 2)}%`,
            backgroundColor: "#007AFF",
            borderRadius: 4,
          }}
        />
      </View>
    </View>
  );
}
