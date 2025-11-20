// App.js
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import TranslateScreen from "./screens/TranslateScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SavedScreen from "./screens/SavedScreen";
import AboutScreen from "./screens/AboutScreen";

import { ThemeContext } from "./utils/themeManager";

import ClassicTheme from "./theme/ClassicTheme";
import RetroTheme from "./theme/RetroTheme";
import CoolTheme from "./theme/CoolTheme";
import DarkTheme from "./theme/DarkTheme";

const Stack = createStackNavigator();

export default function App() {
  const [themeName, setThemeName] = useState("Classic");

  const themes = {
    Classic: ClassicTheme,
    Retro: RetroTheme,
    Cool: CoolTheme,
    Dark: DarkTheme,
  };

  return (
    <ThemeContext.Provider
      value={{
        themeName,
        setThemeName,
        theme: themes[themeName],
      }}
    >
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Translate" component={TranslateScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Saved" component={SavedScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
