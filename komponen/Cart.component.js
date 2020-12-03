import React, { Component } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Badge } from "react-native-elements";
import { connect } from "react-redux";

export class Cart extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.cartItems !== this.props.cartItems) {
    }
  }

  onPress = () => {
    this.props.navigation.navigate("Cart");
  };

  render() {
    const { cartItems } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={this.onPress}>
        {/* <Text style={styles.cart}>{(cartItems).length} items</Text>
                <Badge value="99+" status="error" /> */}
        <View style={{ margin: 10 }}>
          <Image
            source={require("../image/shopping-cart.png")}
            style={{ height: 27, width: 27 }}
            onPress={() => this.props.navigation.navigate("Notif")}
          />
          <Badge
            status="success"
            value={cartItems}
            containerStyle={{ position: "absolute", top: -4, right: -4 }}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
const mapStateToProps = state => ({
  cartItems: state.cart.itemsQty,
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  cart: {
    color: "black",
    fontSize: 14,
  },
});
export default connect(mapStateToProps)(Cart);
