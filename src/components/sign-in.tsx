import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creating, setCreating] = useState(false);
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState("");
  const valid = email.includes("@") && password.length >= 6;

  async function submit() {
    setBusy(true);
    setProblem("");

    const { error } = creating
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) setProblem(error.message);
    setBusy(false);
  }  

  return (
    <View style={styles.screen}>
      <Text style={{ color: "#777" }}>Customer Service App</Text>
      <Text style={{ fontSize: 42, fontWeight: "700", marginBottom: 12 }}>
        Tindahan Ledger
      </Text>
      <Text>{creating ? "Create an account" : "Sign in"}</Text>

      <TextInput 
        value={email} 
        onChangeText={setEmail} 
        placeholder="Email" 
        autoCapitalize="none" 
        keyboardType="email-address" 
        editable={!busy} 
        style={styles.input} 
      />
      <TextInput 
        value={password} 
        onChangeText={setPassword} 
        placeholder="Password, 6 or more characters" 
        secureTextEntry 
        editable={!busy} 
        style={styles.input} 
      />
      
      {problem !== "" && <Text>{problem}</Text>}
      
      <Pressable
        onPress={submit}
        disabled={!valid || busy}
        style={({ pressed }) => [
          {
            backgroundColor: (!valid || busy) ? '#A0A0A0' : pressed ? '#0056b3' : '#007AFF', // Changes color when disabled or pressed
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 12,
          }
        ]}
      >
        <Text style={{ color: '#fff', fontWeight: '600' }}>
          {busy ? "Please wait" : creating ? "Create account" : "Sign in"}
        </Text>
      </Pressable>
      
      <Pressable
        onPress={() => setCreating(!creating)}
        disabled={busy}
        style={({ pressed }) => [
          {
            backgroundColor: busy ? '#A0A0A0' : pressed ? '#0056b3' : '#007AFF',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
          }
        ]}
      >
        <Text style={{ color: '#fff', fontWeight: '600' }}>
          {creating ? "I have an account" : "Create an account"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { 
    flex: 1, 
    justifyContent: "center", 
    padding: 24, 
    gap: 12,
  },
  input: { 
    borderWidth: 1, 
    borderRadius: 8, 
    padding: 12, 
  },
});