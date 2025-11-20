import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ThemeContext } from "../utils/themeManager";

export default function SettingsScreen({ navigation }) {
  const { theme, themeName, setThemeName } = useContext(ThemeContext);

  const themes = ["Classic", "Retro", "Cool", "Dark"];

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={[styles.back, { color: theme.text }]}>← Back</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.text }]}>Theme</Text>

      {themes.map((t) => (
        <TouchableOpacity
          key={t}
          style={[
            styles.btn,
            {
              backgroundColor: themeName === t ? theme.accent : theme.button,
            },
          ]}
          onPress={() => setThemeName(t)}
        >
          <Text
            style={[
              styles.btnText,
              {
                color: themeName === t ? "#FFF" : theme.buttonText,
              },
            ]}
          >
            {t}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  back: { fontSize: 18, marginBottom: 10, marginTop: 40 },
  title: { fontSize: 30, fontWeight: "bold", marginBottom: 20, marginTop: 10   },
  btn: { padding: 15, borderRadius: 10, marginBottom: 15 },
  btnText: { fontSize: 18, textAlign: "center" },
});
