import AsyncStorage from "@react-native-community/async-storage";
import React, { Component } from "react";
import { StatusBar } from "react-native";
// import Route from './app/routes';
import DropdownAlert from "react-native-dropdownalert";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Provider } from "react-redux";
import HomeTabNavigator from "./navigation/HomeTabNavigator";
import LoginTabNavigator from "./navigation/LoginTabNavigator";
import store from "./redux/store";
import { AlertHelper } from "./screens/AlertHelper";
import LandingPageScreen from "./screens/LandingPageScreen";
import InputPasswordHP from "./screens/InputPasswordHP";
import SplashScreen from "./screens/SplashScreen";
import { GoogleSignin, GoogleSigninButton, statusCodes } from "react-native-google-signin";
import FlashMessage from "react-native-flash-message";

function myiOSPromptCallback(permission) {
  // do something with permission value
}

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this.state = { isLoading: true };
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  async componentDidMount() {
    GoogleSignin.configure({
      webClientId: "173784429591-02vsmpk5ltc6ok3qujj3ttcile0o8dpr.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 3000);
    const userToken = await AsyncStorage.getItem("isLoggedIn");
    const firstLaunch = await AsyncStorage.getItem("firstLaunch");
    const skip = await AsyncStorage.getItem("isSkip");
    if (firstLaunch !== "1") {
      this.props.navigation.navigate("Onboard");
    } else if (userToken == "1") {
      this.props.navigation.navigate("Main");
    } else {
      this.props.navigation.navigate("Auth");
    }
  }

  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    }
  }
}

const AppContainer = createAppContainer(
  createSwitchNavigator({
    Starter: AuthLoadingScreen,
    Onboard: LandingPageScreen,
    Main: HomeTabNavigator,
    Auth: LoginTabNavigator,
    InputPasswordHP: InputPasswordHP
  })
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
        <FlashMessage position="top" />
        <DropdownAlert
          defaultContainer={{
            padding: 8,
            paddingTop: StatusBar.currentHeight,
            flexDirection: "row",
          }}
          ref={ref => AlertHelper.setDropDown(ref)}
          onClose={() => AlertHelper.invokeOnClose()}
        />
      </Provider>
    );
  }
}

// Now AppContainer is the main component for React to render
// export default AppContainer;
