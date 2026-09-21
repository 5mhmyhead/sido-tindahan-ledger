import { addCustomer, Customer } from "@/data/customers";
import { problemFor } from "@/data/problem";
import { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onAdded: (customer: Customer) => void;
};

export function AddCustomerModal({ visible, onClose, onAdded }: Props) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const balance = Number(amount);
  const valid =
    name.trim() !== "" &&
    amount !== "" &&
    !Number.isNaN(balance) &&
    balance >= 0;

  function close() {
    if (saving) return; // don't dismiss mid-save
    setName("");
    setAmount("");
    setError("");
    onClose();
  }

  async function save() {
    if (!valid || saving) return;
    setSaving(true);
    setError("");
    try {
      const created = await addCustomer(name.trim(), balance);
      onAdded(created);
      setSaving(false);
      close();
    } catch (e) {
      setError(problemFor(e));
      setSaving(false);
    }
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={close}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            padding: 24,
            gap: 12,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "700" }}>Add customer</Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name"
            editable={!saving}
            style={input}
          />
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="Amount owed"
            keyboardType="decimal-pad"
            editable={!saving}
            style={input}
          />

          {error !== "" && <Text style={{ color: "#d00" }}>{error}</Text>}

          <Pressable
            onPress={save}
            disabled={!valid || saving}
            style={({ pressed }) => ({
              backgroundColor: "#007AFF",
              paddingVertical: 12,
              borderRadius: 12,
              alignItems: "center",
              opacity: !valid || saving ? 0.4 : pressed ? 0.7 : 1,
            })}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>
              {saving ? "Saving..." : "Add"}
            </Text>
          </Pressable>

          <Pressable
            onPress={close}
            disabled={saving}
            style={{ paddingVertical: 12, alignItems: "center" }}
          >
            <Text style={{ color: "#007AFF" }}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const input = {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  padding: 12,
  fontSize: 16,
} as const;
