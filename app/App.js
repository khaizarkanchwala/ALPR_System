import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import User from "./components/user";
import Check_Challans from "./components/check_challan";
import Home from "./components/Home";
import Register from "./components/Registerpage";
import BookChallan from "./components/BookChallan";
import SendChallan from "./components/SendChallan";
import LoginScreen from "./components/login";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="User" component={User}  options={{
            headerShown: false,
          }}/>
      <Stack.Screen name="Check_Challans" component={Check_Challans}  options={{
            
          }}/>
      <Stack.Screen name="LoginScreen" component={LoginScreen}  options={{
            headerShown: false,
          }}/>
        <Stack.Screen name="Home" component={Home}  options={{
            headerShown: false,
          }}/>
        <Stack.Screen name="Register" component={Register}  />
        <Stack.Screen name="BookChallan" component={BookChallan}  />
        <Stack.Screen name="SendChallan" component={SendChallan}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
