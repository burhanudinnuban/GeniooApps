import React, { Component } from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import BelumBayarScreen from './BelumBayarScreen';
import TimerPaymentScreen from './TimerPaymentScreen';
import DikemasScreen from './DikemasScreen';



const Toptab = createMaterialTopTabNavigator({

  BelumBayar: { screen: BelumBayarScreen },
  Dikemas: { screen: DikemasScreen },

})


const AppContainer = createAppContainer(
  createSwitchNavigator({
    Homescreen: { screen: Toptab },
    TimerPayment: { screen: TimerPaymentScreen },
  }, {
    initialRouteName: 'Homescreen',
  })
);

export default class App extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Pesanan Saya",
  });
  render() {
    return (
      <AppContainer />
    );
  }
}