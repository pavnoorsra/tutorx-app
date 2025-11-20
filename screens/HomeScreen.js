import React, { useContext } from "react";
import { Image } from "react-native";
import tutorxLogo from "../assets/tutorxlogo.png";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ThemeContext } from "../utils/themeManager";

export default function HomeScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <Image
        source={tutorxLogo}
        style={{ width: 180, height: 180, alignSelf: "center", marginBottom: 20 }}
        resizeMode="contain"
      />
      <Text style={[styles.title, { color: theme.text }]}>TutorX</Text>

      {["Translate", "Saved", "Settings", "About"].map((page) => (
        <TouchableOpacity
          key={page}
          style={[styles.btn, { backgroundColor: theme.button }]}
          onPress={() => navigation.navigate(page)}
        >
          <Text style={[styles.btnText, { color: theme.buttonText }]}>
            {page}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 30 },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    fontStyle: "italic",
  },
  btn: { padding: 15, borderRadius: 10, marginBottom: 20 },
  btnText: { fontSize: 18, textAlign: "center", fontWeight: "600" },
});
