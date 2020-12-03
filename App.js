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
import OTPRegister from "./screens/OTPRegister";
import { GoogleSignin, GoogleSigninButton, statusCodes } from "react-native-google-signin";
import FlashMessage from "react-native-flash-message";

function myiOSPromptCallback(permission) {
  // do something with permission value
}

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this.state = { isLoading: true };
    //Remove this method to stop OneSignal Debugging 
    OneSignal.setLogLevel(6, 0);

    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    OneSignal.init("f352598c-dc37-46ad-8c67-f46b82a7469d", { kOSSettingsKeyAutoPrompt: false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption: 2 });
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
    OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
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
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);

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
    OTPV: OTPRegister,
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
