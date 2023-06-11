import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Home from "./app/home";
import Login from "./app/login";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const { Navigator, Screen } = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="home" component={Home} />
        <Screen
          name="login"
          component={Login}
          options={{ header: () => null, tabBarStyle: { display: "none" } }}
        />
      </Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
