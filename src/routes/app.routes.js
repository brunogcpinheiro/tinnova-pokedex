import { createStackNavigator } from "@react-navigation/stack";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Details from "../pages/Details";

const Stack = createStackNavigator();

export function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerShown: true,
          headerTitle: "Back",
        }}
      />
    </Stack.Navigator>
  );
}
