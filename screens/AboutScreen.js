// screens/AboutScreen.js
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ThemeContext } from "../utils/themeManager";

export default function AboutScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={[styles.back, { color: theme.text }]}>← Back</Text>
      </TouchableOpacity>

      {/* About Text */}
      <Text style={[styles.text, { color: theme.text, fontStyle: "italic" }]}>
        TutorX is a lightweight, multilingual translation app built to deliver
        fast, clean and reliable translation.{"\n"}{"\n"}
        The goal is simple — smooth experience, custom themes and a minimal UI.{"\n"}{"\n"}
        <Text style={{ fontWeight: "bold", fontStyle: "normal", color: theme.text }}>
          More features are coming very soon!{"\n"}{"\n"}{"\n"}{"\n"}
        </Text>
        <Text style={{ fontWeight: "600", fontStyle: "normal", color: theme.text }}>
        Thank you for using TutorX!
      </Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 0,
  },
  back: {
    fontSize: 18,
    marginBottom: 20,
    marginTop: 40,
  },
  text: {
    fontSize: 18,
    lineHeight: 27,
  },
});
