import React, { Component } from "react";
import { ActivityIndicator, AsyncStorage, StatusBar, View } from "react-native";
import { createAppContainer, createStackNavigator, createSwitchNavigator } from "react-navigation";
import AuthScreen from "../screens/AuthScreen";
import HomeScreen from "../screens/HomeScreen";
import Login from "../screens/Login";
import LostPasswordScreen from "../screens/LostPasswordScreen";
import RegistrationScreen from "../screens/RegistrationScreen";

const AuthStack = createStackNavigator({
  Home: HomeScreen,
  Auth: AuthScreen,
  Registration: RegistrationScreen,
  LostPassword: LostPasswordScreen,
});

AuthStack.navigationOptions = {
  headerMode: "none",
  navigationOptions: {
    headerVisible: false,
  },
};

const Auth = createStackNavigator({ Login: Login });

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._loadData();
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _loadData = async () => {
    const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
    this.props.navigation.navigate(isLoggedIn !== "1" ? "Auth" : "App"); // navigate ini ada di bawah
  };
}

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AuthStack,
    Auth: Auth
    },
    { initialRouteName: "AuthLoading" }
  )
);
