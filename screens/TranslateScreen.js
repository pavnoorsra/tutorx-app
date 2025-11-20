// screens/TranslateScreen.js
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../utils/themeManager";

export default function TranslateScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);

  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [targetLang, setTargetLang] = useState("Punjabi");

  const langs = ["Hindi", "Punjabi", "French"];

  async function translateNow() {
    if (!text.trim()) return;

    setLoading(true);
    setOutput("");

    try {
      const response = await fetch(
        "https://tutorx-backend.onrender.com/translate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, targetLang }),
        }
      );

      const json = await response.json();
      setOutput(json.translated || "Could not translate");
    } catch (err) {
      setOutput("Network error");
    }

    setLoading(false);
  }

  async function saveTranslation() {
    try {
      const newItem = {
        id: Date.now(),
        text,
        translated: output,
        lang: targetLang,
      };

      const existing = await AsyncStorage.getItem("SAVED_TRANSLATIONS");
      let items = existing ? JSON.parse(existing) : [];

      items.unshift(newItem);

      await AsyncStorage.setItem(
        "SAVED_TRANSLATIONS",
        JSON.stringify(items)
      );

      alert("Saved successfully!");
    } catch (err) {
      console.log(err);
      alert("Error saving");
    }
  }

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: theme.bg }}>
      {/* Back */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ marginTop: 25, fontSize: 18, color: theme.text }}>← Back</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.text }]}>Translate</Text>

      {/* Input */}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.card,
            color: theme.text,
            borderColor: theme.border,
          },
        ]}
        placeholder="Type something..."
        placeholderTextColor={theme.placeholder}
        multiline
        value={text}
        onChangeText={setText}
      />

      {/* Language Picker */}
      <Text style={[styles.label, { color: theme.text }]}>
        Translate to:
      </Text>

      <View style={styles.langRow}>
        {langs.map((lang) => (
          <TouchableOpacity
            key={lang}
            style={[
              styles.langBtn,
              {
                backgroundColor:
                  targetLang === lang ? theme.accent : theme.card,
                borderColor: theme.border,
              },
            ]}
            onPress={() => setTargetLang(lang)}
          >
            <Text
              style={{
                color: targetLang === lang ? "white" : theme.text,
                fontWeight: "bold",
              }}
            >
              {lang}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Translate Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.accent }]}
        onPress={translateNow}
      >
        <Text style={styles.btnText}>
          {loading ? "Translating…" : "Translate"}
        </Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color={theme.accent} />}

      {/* Output */}
      {output !== "" && (
        <View
          style={[
            styles.outputBox,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.outputText, { color: theme.text }]}>
            {output}
          </Text>
        </View>
      )}

      {/* ⭐ SAVE BUTTON */}
      {output !== "" && (
        <TouchableOpacity
          style={{
            marginTop: 20,
            padding: 14,
            borderRadius: 10,
            backgroundColor: theme.accent,
          }}
          onPress={saveTranslation}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Save Translation
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 30, fontWeight: "bold", marginBottom: 20, marginTop: 40 },

  input: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    minHeight: 120,
    marginBottom: 15,
  },

  label: { fontSize: 18, fontWeight: "700", marginBottom: 10 },

  langRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },

  langBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderRadius: 20,
  },

  button: { padding: 14, borderRadius: 10, marginBottom: 20,},
  btnText: { color: "white", textAlign: "center", fontSize: 18 },

  outputBox: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },

  outputText: { fontSize: 18, lineHeight: 25 },
});
