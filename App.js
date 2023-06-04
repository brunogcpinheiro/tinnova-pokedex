import React from "react";
import { NativeBaseProvider } from "native-base";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import { theme } from "./src/theme";
import { Routes } from "./src/routes";
import { AuthProvider } from "./src/context/authContext";

const App = () => {
  let [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NativeBaseProvider>
  );
};

export default App;
