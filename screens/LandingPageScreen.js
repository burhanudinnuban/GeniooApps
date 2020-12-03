import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import Swiper from "./Swiper";

export default class LandingPageScreen extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Swiper navigation={this.props.navigation}>
        {/* First screen */}
        <View style={styles.slide}>
          <Icon name="home" {...iconStyles} />
          <Text style={styles.header}>one</Text>
          <Text style={styles.text}>one</Text>
        </View>
        {/* Second screen */}
        <View style={styles.slide}>
          <Icon name="people" {...iconStyles} />
          <Text style={styles.header}>two</Text>
          <Text style={styles.text}>two</Text>
        </View>
        {/* Third screen */}
        <View style={styles.slide}>
          <Icon name="videocam" {...iconStyles} />
          <Text style={styles.header}>three</Text>
          <Text style={styles.text}>three</Text>
        </View>
      </Swiper>
    );
  }
}
const iconStyles = {
  size: 100,
  color: "#00CED1",
};
const styles = StyleSheet.create({
  // Slide styles
  slide: {
    flex: 1, // Take up all screen
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: "#ffff",
  },
  // Header styles
  header: {
    color: "#00CED1",
    fontFamily: "Avenir",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 15,
  },
  // Text below header
  text: {
    color: "#00CED1",
    fontFamily: "Avenir",
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: "center",
  },
});
