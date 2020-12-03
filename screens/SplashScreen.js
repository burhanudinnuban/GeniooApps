import React from "react";
import { Image, View } from "react-native";

class SplashScreen extends React.Component {
  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve("result");
      }, 3000)
    );
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.props.navigation.navigate("App");
    }
  }

  render() {
    return (
      <View style={styles.viewStyles}>
        <Image
          source={require("../image/GenioLogoSplash.png")}
          style={{ height: 147, width: 319, resizeMode: 'contain' }}
        />
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0edf6",
  },
};

export default SplashScreen;
