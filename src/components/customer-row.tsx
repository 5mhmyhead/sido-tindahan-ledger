import { useState } from "react";
import { Pressable, Text } from "react-native";

type CustomerRowProps = { name: string; balance: number; onPress: () => void };

export function CustomerRow({ name, balance, onPress }: CustomerRowProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Pressable
      onPress={onPress}
      style={{ paddingVertical: 14, borderBottomWidth: 1, borderColor: "#ddd" }}
    >
      <Text style={{ fontSize: 18 }}>{name}</Text>
      <Text>₱ {balance.toFixed(2)}</Text>
    </Pressable>
  );
}
