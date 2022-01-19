import React from "react";
import HomeScreen from "./screens/Home"
import DetailsScreen from "./screens/Details"
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return <AppContainer/>
}
const appStackNavigator = createStackNavigator({
  Home : { screen : HomeScreen , navigationOptions: { headerShown: false} },
  Details : { screen : DetailsScreen }
},
{
  initialRouteName : "Home"
}
)
const AppContainer = createAppContainer(appStackNavigator)
