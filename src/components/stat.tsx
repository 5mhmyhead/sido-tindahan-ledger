import { Text, View } from "react-native";

type StatProps = { label: string; value: string };

export function Stat({ label, value }: StatProps) {
  return (
    <View style={{ flex: 1, gap: 10 }}>
      <Text style={{ fontSize: 14, color: "#999" }}>{label}</Text>
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={{
          fontSize: 24,
          lineHeight: 32,
          fontWeight: "700",
        }}
      >
        {value}
      </Text>
    </View>
  );
}
