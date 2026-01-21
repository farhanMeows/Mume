import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./src/theme/ThemeContext";
import AppNavigator from "./src/navigation/AppNavigator";
import { useEffect } from "react";
import { useSongStore } from "./src/store/songStore";

function Bootstrap() {
  useEffect(() => {
    const init = () => {
      const { hydratePlayer, hydrateRecentlyPlayed, hydrateQueue } =
        useSongStore.getState();

      hydratePlayer();
      hydrateRecentlyPlayed();
      hydrateQueue();
    };

    init();
  }, []);

  return null;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Bootstrap />
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
