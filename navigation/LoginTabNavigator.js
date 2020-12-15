import React from "react";
//import { Ionicons } from "@expo/vector-icons";
//import store from '../redux/store';
import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
} from "react-navigation";
import TabBarIcon from "../components/TabBarIcon";
import AlatScreen from "../screens/AlatScreen";
import CartScreen from "../screens/CartScreen";
import NotificationScreen from "../screens/NotificationScreen";
//import IconWithBadge from "../components/IconWithBadge";
import CheckoutScreen from "../screens/CheckoutScreen";
//import ChildCategoriesScreen from "../screens/ChildCategoriesScreen";
//import ParentCategoriesScreen from "../screens/ParentCategoriesScreen";
//import DiscountProductsScreen from "../screens/DiscountProductsScreen";
import HomeScreen from "../screens/HomeScreen";
import InputPasswordScreen from "../screens/InputPasswordScreen";
import LoginScreen from "../screens/LoginScreen";
import LostPasswordScreen from "../screens/LostPasswordScreen";
//import CustomerFormScreen from "../komponen/CustomerForm.component";
import Midtrans from "../screens/Midtrans";
import MTPaymentScreen from "../screens/MTPaymentScreen";
//import OrdersScreen from "../screens/OrdersScreen";
import ProductInformationScreen from "../screens/ProductInformationScreen";
//import DeliveryScreen from "../screens/DeliveryScreen";
//import CheckoutScreen from "../screens/CheckoutScreen";
//import CartScreen from "../screens/CartScreen";
import ProductScreen from "../screens/ProductScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HistoryScreen from "../screens/HistoryScreen";
import RegistrationScreen from "../screens/RegisterScreen";
import ReviewsScreen from "../screens/ReviewsScreen";
import SaranaScreen from "../screens/SaranaScreen";
import RegisterEmail from "../screens/RegisterEmail";
import TimerPaymentScreen from "../screens/TimerPaymentScreen";
import HistoryOrderScreen from "../screens/HistoryOrderScreen";
//import DeliveryAddressScreen from "../screens/DeliveryAddressScreen";
import SuccessReviewScreen from "../screens/SuccessReviewScreen";
//import OrderScreen from "../screens/OrderScreen";
//import ThankForOrderScreen from "../screens/ThankForOrderScreen";
//import SavedSuccessfulScreen from "../screens/SavedSuccessfulScreen";
//import AccountCreatedSuccessScreen from "../screens/AccountCreatedSuccessScreen";
import WriteReviewScreen from "../screens/WriteReviewScreen";
import colors from "../config/colors";
import Gopay from "../screens/PayIntegration/GoPay";
import Card from "../screens/PayIntegration/CardCredit";
import WebView from "../screens/PayIntegration/WebView";
import ScanQRCode from "../screens/PayIntegration/ScanQRCode";
import OpsiVerifikasiScreen from "../screens/OpsiVerifikasiScreen"

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  GoPay: Gopay,
  ScanQRCode: ScanQRCode,
  Card: Card,
  WebView: WebView,
  Product: ProductScreen,
  ProductInformation: ProductInformationScreen,
  Checkout: CheckoutScreen,
  Midtrans: Midtrans,
  MTPaymentScreen: MTPaymentScreen,
  Login: LoginScreen,
  Registrasi: RegistrationScreen,
  OpsiVerifikasi: OpsiVerifikasiScreen,
  RegisterEmail: RegisterEmail,
  Reviews: ReviewsScreen,
  WriteReview: WriteReviewScreen,
  SuccessReview: SuccessReviewScreen,
  InputPassword: InputPasswordScreen,
  LostPassword: LostPasswordScreen,
  Cart: CartScreen,
  Sarana: SaranaScreen,
  Alat: AlatScreen,
  Notif: NotificationScreen,
});

const getScreenRegisteredFunctions = navState => {
  // When we use stack navigators. 
  // Also needed for react-navigation@2
  const { routes, index, params } = navState;

  if (navState.hasOwnProperty('index')) {
    return getScreenRegisteredFunctions(routes[index]);
  }
  // When we have the final screen params
  else {
    return params;
  }
}

HomeStack.navigationOptions = ({ navigation }) => ({
  tabBarOnPress: ({ navigation, defaultHandler }) => {
    navigation.navigate("Home");
    defaultHandler();
    if (navigation && navigation.isFocused()) {
      const screenFunctions = getScreenRegisteredFunctions(navigation.state);

      if (screenFunctions && typeof screenFunctions.tapOnTabNavigator === 'function') {
        screenFunctions.tapOnTabNavigator()
      }
    }
  },
  // tabBarVisible: !(navigation.state.index > 0),
  tabBarLabel: "Home",
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon
      focused={focused}
      tintColor={colors.gray}
      name={Platform.OS === "ios" ? `ios-home${focused ? "" : ""}` : "md-home"}
    />
  ),
  tabBarOptions: {
    activeTintColor: colors.primary,
    inactiveTintColor: colors.gray,
    labelStyle: {
      fontFamily: "work-sans-semibold",
      fontSize: 10,
    },
    style: {
      height: 60,
      paddingVertical: 7,
      borderTopWidth: 0.5,
      borderTopColor: "#bbb",
    },
  },
});

const CartStack = createStackNavigator({
  History: HistoryScreen,
  //Delivery: DeliveryScreen,
  //ThankForOrder: ThankForOrderScreen,
  //CustomerForm: CustomerFormScreen,
});

CartStack.navigationOptions = ({ navigation }) => ({
  tabBarOnPress: ({ navigation, defaultHandler }) => {
    navigation.navigate("History");
    if (navigation && navigation.isFocused()) {
      const screenFunctions = getScreenRegisteredFunctions(navigation.state);

      if (screenFunctions && typeof screenFunctions.tapOnTabNavigator === 'function') {
        screenFunctions.tapOnTabNavigator()
      }
    }
    defaultHandler();
  },
  // tabBarVisible: !(navigation.state.index > 0),
  tabBarLabel: "History",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `ios-home${focused ? "" : ""}` : "md-book"}
    />
  ),
  tabBarOptions: {
    activeTintColor: colors.primary,
    inactiveTintColor: colors.gray,
    labelStyle: {
      fontFamily: "work-sans-semibold",
      fontSize: 10,
    },
    style: {
      height: 60,
      paddingVertical: 7,
      borderTopWidth: 0.5,
      borderTopColor: "#bbbbbb",
    },
  },
});

const ProfileStack = createStackNavigator({
  // nambah link disini... "dipanggil": nama-di-atas
  // Orders: OrdersScreen,

  Login: LoginScreen,
  Registrasi: RegistrationScreen,
  OpsiVerifikasi: OpsiVerifikasiScreen,
  // TimerPayment: TimerPaymentScreen,
  HistoryOrder: HistoryOrderScreen,
  RegisterEmail: RegisterEmail,
  Profile: ProfileScreen,
  InputPassword: InputPasswordScreen,
  LostPassword: LostPasswordScreen,
  //Order: OrderScreen,
  //SavedSuccessful: SavedSuccessfulScreen,
});

ProfileStack.navigationOptions = ({ navigation }) => ({
  tabBarOnPress: ({ navigation, defaultHandler }) => {
    navigation.navigate("Login");
    if (navigation && navigation.isFocused()) {
      const screenFunctions = getScreenRegisteredFunctions(navigation.state);

      if (screenFunctions && typeof screenFunctions.tapOnTabNavigator === 'function') {
        screenFunctions.tapOnTabNavigator()
      }
    }
  },
  // tabBarVisible: !(navigation.state.index > 0),
  tabBarLabel: "Masuk",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `ios-home${focused ? "" : ""}` : "md-log-in"}
    />
  ),
  tabBarOptions: {
    activeTintColor: colors.primary,
    inactiveTintColor: colors.gray,
    labelStyle: {
      fontFamily: "work-sans-semibold",
      fontSize: 10,
    },
    style: {
      height: 60,
      paddingVertical: 7,
      borderTopWidth: 0.5,
      borderTopColor: "#bbb",
    },
  },
});

export default createBottomTabNavigator({
  Home: HomeStack,
  History: CartStack,
  Profile: ProfileStack,
});

// export default createBottomTabNavigator(
//     {
//         Home: HomeScreen,
//         Cart: CartScreen,
//         Profile: ProfileScreen,
//
//     },
//     {
//         defaultNavigationOptions: ({ navigation }) => ({
//             tabBarIcon: ({ focused, horizontal, tintColor }) => {
//                 const { routeName } = navigation.state;
//                 let IconComponent = Ionicons;
//                 let iconName;
//                 if (routeName === 'Home') {
//                     return <IconComponent name={'ios-home'} size={25} color={tintColor} />
//                 } else if (routeName === 'Profile') {
//                     return <IconComponent name={'ios-contact'} size={25} color={tintColor} />
//                 } else if (routeName === 'Cart') {
//                     const other_param = navigation.getParam('name', '0');
//                     return <IconWithBadge name={'ios-cart'} size={25} color={tintColor} badgeCount={other_param}/>
//                     // Sometimes we want to add badges to some icons.
//                     // You can check the implementation below.
//                 }
//             },
//         }),
//         tabBarOptions: {
//             activeTintColor: "#F05829",
//             inactiveTintColor: "#000",
//             labelStyle: {
//                 fontFamily: "work-sans-semibold",
//                 fontSize: 10,
//             },
//             style: {
//                 height: 60,
//                 paddingVertical: 7,
//                 borderTopWidth: 0.5,
//                 borderTopColor: "#bbb"
//             }
//         }
//     }
// );
