/* eslint-disable react/sort-comp */
// import CartItems  from '../komponen/CartItems.component';
// import CustomerForm from '../komponen/CustomerForm.component';
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import React, { Component } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Button, Image, ThemeProvider } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Swipeout from "react-native-swipeout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../redux/actions/cartActions";
// import { addToCart, removeItem } from '../redux/actions/cartActions';
import { styles, theme } from "../styles/CartScreenStyles";
import colors from "../config/colors";
// import PaymentGateway from 'react-native-midtrans-payment';

const midtransClient = require("midtrans-client");

class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yuerel: "",
    };
  }

  async pay1(total) {
    // Create Snap API instance
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: "SB-Mid-server-KwD1SOryRA9QmJRtLuv7uw40",
      clientKey: "SB-Mid-client-cUOnTtFZi_sZ59D4",
    });

    const time = format(new Date(), "yyMMddHHmmss");
    const orderId = `TRX${time}${Math.floor(Math.random() * 100)}`;
    console.log(`\n order_id:${orderId}`);

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: total,
      },
      credit_card: {
        secure: true,
      },
    };
    await snap.createTransactionRedirectUrl(parameter).then(url => {
      console.log(`yuerel :${url}`);
      console.log(`trxID: ${orderId}`);
      this.state.yuerel = url;
      this.props.navigation.navigate("MTPaymentScreen", { yuerel: url });
    });
  }

  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <Button
        containerStyle={{
          marginLeft: 0,
        }}
        buttonStyle={{
          paddingVertical: 10,
          paddingRight: 20,
        }}
        type="clear"
        onPress={() => {
          navigation.goBack();
        }}
        icon={<Ionicons name="ios-arrow-back" size={20} color="#000" />}
      />
    ),
    // headerRight: <CartHeader navigation={navigation} />,
    headerStyle: {
      backgroundColor: "#fff",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      elevation: 0,
      marginHorizontal: 24,
    },
    title: "Notifikasi",
    headerTitleStyle: {
      fontFamily: "Roboto",
      fontSize: 18,
      textAlign: "center",
      flex: 1,
      marginTop: 10,
    },
  });

  addItemToCart(mod, item) {
    console.log(`ProdukDetail aft QTY:${JSON.stringify(item)}\n`);
    mod == "plus" ? this.props.actions.addToCart(item) : this.props.actions.removeItem(item);
    // this.props.addToCart(item);
  }

  upItemToCart(item) {
    console.log(`\nupdatedItem.qty: ${JSON.stringify(item.qty)}`);
    this.props.actions.updateItemToCart(item);
  }

  async componentDidMount() {
    const { actions } = this.props;
    // actions.fetchCartData(1);

    if (this.props.cartInfo && this.props.cartInfo.length > 0) {
      console.log(`\n cartInfo: ${JSON.stringify(this.props.cartInfo[0].totalprice)}`);
    } else {
      actions.fetchCartData(1);
    }
  }

  render() {
    const { cartItems, cartTotal, cartInfo, itemsQty, navigation } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <SafeAreaView>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.container}>
              <View style={styles.container}>
                <FlatList
                  style={styles.productListContainer}
                  showsHorizontalScrollIndicator={false}
                  data={cartItems}
                  // keyExtractor={(item, index) => item.id}
                  keyExtractor={(item, index) => index}
                  renderItem={({ item }) => (
                    <View style={styles.swipeContainer}>
                      <Swipeout
                        right={[
                          {
                            component: (
                              <TouchableOpacity
                                onPress={() =>
                                  this.props.actions.emptyCart(item)
                                }
                                // onPress={() => { this.props.removeItem({items})}}
                                // onPress={()=>(this.swipeHandleDelete())}
                                style={styles.deleteIconContainer}
                              >
                                <Ionicons
                                  name="md-trash"
                                  size={28}
                                  color="#F05829"
                                />
                              </TouchableOpacity>
                            ),
                            backgroundColor: "#fff",
                          },
                        ]}
                        autoClose
                        backgroundColor="transparent"
                        buttonWidth={96}
                      >
                        <View style={styles.productContainer}>
                          <TouchableOpacity
                            onPress={() => this.deleteItemById(item)}
                          >
                            <Image
                              source={{ uri: item.photomainpath }}
                              style={styles.productImage}
                            />
                          </TouchableOpacity>
                          <View style={styles.productContent}>
                            <Text style={[styles.titleProductGridItem]}>
                              {item.name}
                            </Text>
                            <Text style={[styles.titleProductGridItem]}>
                              {item.descriptionshort}
                            </Text>
                          </View>
                        </View>
                      </Swipeout>
                    </View>
                  )}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  cartInfo: state.cart.cartInfo,
  cartItems: state.cart.cart,
  cartTotal: state.cart.total,
});

const ActionCreators = Object.assign({}, cartActions);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);
