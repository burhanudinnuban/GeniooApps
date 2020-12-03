import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import MainTabNavigator from "../HomeTabNavigator";
//import AuthNavigator from "../AuthNavigator";

const Route = createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    //Auth: AuthNavigator,
    Main: MainTabNavigator,
  })
);
export default Route;
