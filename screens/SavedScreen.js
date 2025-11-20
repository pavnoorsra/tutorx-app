// screens/SavedScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { ThemeContext } from "../utils/themeManager";
import { useContext } from "react";

export default function SavedScreen() {
  const [saved, setSaved] = useState([]);
  const { theme } = useContext(ThemeContext);

  // Load saved translations every time screen opens
  useFocusEffect(
    React.useCallback(() => {
      loadSaved();
    }, [])
  );

  async function loadSaved() {
    const data = await AsyncStorage.getItem("SAVED_TRANSLATIONS");
    setSaved(data ? JSON.parse(data) : []);
  }

  async function deleteItem(id) {
    const filtered = saved.filter((item) => item.id !== id);
    setSaved(filtered);
    await AsyncStorage.setItem("SAVED_TRANSLATIONS", JSON.stringify(filtered));
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <Text style={[styles.title, { color: theme.text }]}>Saved Translations</Text>

      {saved.length === 0 ? (
        <Text style={{ color: theme.text, fontSize: 16 }}>
          No saved translations yet.
        </Text>
      ) : (
        <FlatList
          data={saved}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.card,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              <Text style={[styles.original, { color: theme.text }]}>
                {item.text}
              </Text>

              <Text style={[styles.translated, { color: theme.accent }]}>
                {item.translated}
              </Text>

              <Text style={{ color: theme.text, opacity: 0.6, marginTop: 5 }}>
                → {item.lang}
              </Text>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => deleteItem(item.id)}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, marginTop: 40 },

  card: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  original: { fontSize: 18, marginBottom: 5 },
  translated: { fontSize: 20, fontWeight: "bold" },

  deleteBtn: {
    marginTop: 10,
    backgroundColor: "red",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
});
