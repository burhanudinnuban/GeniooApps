import React from "react";
// import { Ionicons } from "@expo/vector-icons";
// import store from '../redux/store';
import { Platform } from "react-native";
import { createBottomTabNavigator, createStackNavigator } from "react-navigation";
// import { createStackNavigator } from '@react-navigation/stack';
import TabBarIcon from "../components/TabBarIcon";
import colors from "../config/colors";
import AlatScreen from "../screens/AlatScreen";
// import IconWithBadge from "../components/IconWithBadge";
import CheckoutScreen from "../screens/CheckoutScreen";
import HistoryScreen from "../screens/HistoryScreen";
// import ChildCategoriesScreen from "../screens/ChildCategoriesScreen";
// import ParentCategoriesScreen from "../screens/ParentCategoriesScreen";
// import DiscountProductsScreen from "../screens/DiscountProductsScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import LostPasswordScreen from "../screens/LostPasswordScreen";
import Midtrans from "../screens/Midtrans";
import MTPaymentScreen from "../screens/MTPaymentScreen";
import ProductInformationScreen from "../screens/ProductInformationScreen";
import CartScreen from "../screens/CartScreen";
import ProductScreen from "../screens/ProductScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegistrationScreen from "../screens/RegisterScreen";
import ReviewsScreen from "../screens/ReviewsScreen";
import SaranaScreen from "../screens/SaranaScreen";
import SuccessReviewScreen from "../screens/SuccessReviewScreen";
import WriteReviewScreen from "../screens/WriteReviewScreen";
import NotificationScreen from "../screens/NotificationScreen";
import JasaPengiriman from "../komponen/JasaPengiriman";
import FormDataPengiriman from "../komponen/FormDataPengiriman";
import TimerPaymentScreen from "../screens/TimerPaymentScreen";
import HistoryOrderScreen from "../screens/HistoryOrderScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Product: ProductScreen,
  ProductInformation: ProductInformationScreen,
  Checkout: CheckoutScreen,
  Reviews: ReviewsScreen,
  WriteReview: WriteReviewScreen,
  SuccessReview: SuccessReviewScreen,
  MTPaymentScreen,
  Midtrans,
  Cart: CartScreen,
  Sarana: SaranaScreen,
  Alat: AlatScreen,
  Notif: NotificationScreen,
  JasaPengiriman,
  FormDataPengiriman,
});

// const HomeTabScreens = ({ navigation }) => {
//   <HomeStack.Navigator
// }

HomeStack.navigationOptions = ({ navigation }) => ({
  tabBarVisible: ({ navigation }) => {
    const { routeName } = navigation.state;
    if (routeName === "SuccessReviewScreen") {
      return false;
    }
    if (routeName === "WriteReview") {
      return false;
    }
  },
  tabBarOnPress: ({ navigation, defaultHandler }) => {
    navigation.navigate("Home");
    defaultHandler();
  },
  tabBarLabel: "Home",
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon
      focused={focused}
      tintColor={colors.gray}
      name={Platform.OS === "ios" ? `ios-home${focused ? "" : ""}` : "md-home"}
    />
  ),
  tabBarVisible: !(navigation.state.index > 0),
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
});

CartStack.navigationOptions = ({ navigation }) => ({
  tabBarOnPress: ({ navigation, defaultHandler }) => {
    navigation.navigate("History");
    defaultHandler();
  },
  tabBarVisible: !(navigation.state.index > 0),
  tabBarLabel: "History",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === "ios" ? "ios-cart" : "md-book"} />
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
  Profile: ProfileScreen,
  Login: LoginScreen,
  Registrasi: RegistrationScreen,
  LostPassword: LostPasswordScreen,
  TimerPayment: TimerPaymentScreen,
  HistoryOrder: HistoryOrderScreen,
  // Order: OrderScreen,
  // SavedSuccessful: SavedSuccessfulScreen,
});

ProfileStack.navigationOptions = ({ navigation }) => ({
  tabBarOnPress: ({ navigation, defaultHandler }) => {
    navigation.navigate("Profile");
    defaultHandler();
  },
  tabBarVisible: !(navigation.state.index > 0),
  tabBarLabel: "Profil",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === "ios" ? "ios-contact" : "md-contact"} />
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