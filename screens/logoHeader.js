import React from "react";
import { Image } from "react-native-elements";

export default function logoHeader() {
  return (
    <Image
      style={{ width: 52, height: 40, margin: 5, alignSelf: "auto" }}
      source={{ uri: "asset:/images/logo_genio.png" }}
      onPress={() => this.props.navigation.navigate("Home")}
    />
  );
}
