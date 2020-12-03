/* eslint-disable react/sort-comp */

import React, { Component } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import { Button, Image, ThemeProvider } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../redux/actions/cartActions";
import Colors from "../config/colors";
import { styles, theme } from "../styles/CartScreenStyles";
import colors from "../config/colors";

class CheckoutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yuerel: "",
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Detail Pembayaran",
    headerTitleStyle: {
      textAlign: "center",
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
    const { actions, cart } = this.props;
    console.log("cartTotal :", this.props.cartTotal, "totalCosts:", this.props.totalCost)

    const id_user = await AsyncStorage.getItem("id_konsumen");
    actions.fetchCartData(id_user);
  }

  render() {
    const { cartItems, cartTotal, totalCost, itemsQty, navigation } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <SafeAreaView>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.container}>
              <View style={styles.productContainerJasa}>
                <View style={styles.productContentJasa}>
                  <Text style={{ marginBottom: 5, fontSize: 18, fontWeight: "bold", color: colors.primary }}>
                    {"Data Penerima"}
                  </Text>
                  <Text>
                    {this.props.penerimaAwal} {this.props.penerimaAkhir}
                  </Text>
                  <Text>{this.props.teleponInfo}</Text>
                  <Text>{this.props.alamatInfo}</Text>
                  <Text>{this.props.kotaInfo}</Text>
                  <Text>{this.props.provinsiInfo}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("FormDataPengiriman")}
                >
                  <View
                    style={{ marginRight: 20, backgroundColor: Colors.primary, borderRadius: 15 }}
                  >
                    <Text style={{ margin: 10, color: Colors.white }}>Ubah</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.container}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={cartItems}
                  // keyExtractor={(item, index) => item.id}
                  keyExtractor={(item, index) => index}
                  renderItem={({ item }) => (
                    <View style={{
                      flexDirection: "row", margin: 10, borderRadius: 10, backgroundColor: "white",
                      elevation: 8, flex: 1
                    }}>
                      <Image
                        source={{ uri: item.photomainpath }}
                        style={styles.productImage}
                      />
                      <View style={{ flexDirection: "column", margin: 10, flex: 1 }}>
                        <Text style={{ color: colors.black, fontWeight: "bold" }}>{item.name}</Text>
                        <Text style={{ color: colors.gray }}>{item.descriptionshort}</Text>
                        <Text style={{ color: colors.gray }}>Rp.{item.sellprice}</Text>
                        <Text style={{ color: colors.primary, fontWeight: "bold", textAlign: "right" }}>Rp.{item.sellprice * item.qty}</Text>
                        <Text style={{ color: colors.gray, textAlign: "right" }}>Jumlah : {item.qty}</Text>
                      </View>
                    </View>
                  )}
                />

                <TouchableOpacity onPress={() => this.props.navigation.navigate("JasaPengiriman")}>
                  <View style={styles.productContainerJasa}>
                    <View style={styles.productContentJasa}>
                      <Text style={{ marginBottom: 5, fontSize: 18, fontWeight: "bold", color: colors.primary }}>
                        {"Opsi Pengiriman"}
                      </Text>
                      <Text>{this.props.kurirInfo}</Text>
                      <Text>Service {this.props.serviceInfo}</Text>
                      <Text>waktu pengiriman {this.props.waktuKirimInfo} hari</Text>
                    </View>
                    <Text style={{ marginRight: 5 }}>Rp {this.props.costInfo}</Text>
                  </View>
                </TouchableOpacity>
                <Button
                  buttonStyle={styles.saveButton}
                  titleStyle={styles.titleButtonStyle}
                  title="PROSES PEMBAYARAN"
                  icon={
                    <View style={styles.buttonIconContainer}>
                      {/* <Text style={styles.totalButtonText}>Total</Text> */}
                      <Text style={styles.totalButtonValue}>Rp.{totalCost}</Text>
                    </View>
                  }
                  iconRight
                  onPress={() => this.props.navigation.navigate("MTPaymentScreen")}
                  containerStyle={styles.saveButtonContainer}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ThemeProvider>
    );
  }
}

let mapStateToProps = state => ({
  cartInfo: state.cart.cartInfo,
  cart: state.cart,
  costs: state.cart.costs,
  cartItems: state.cart.cart,
  cartTotal: state.cart.totalCart,
  cityInfo: state.cart.cityResult,
  totalCost: state.cart.totalCost,
  provinceInfo: state.cart.provinceResult,
  penerimaAwal: state.cart.penerimaAwal,
  penerimaAkhir: state.cart.penerimaAkhir,
  teleponInfo: state.cart.telepon,
  alamatInfo: state.cart.alamat,
  postal_code: state.cart.postal_code,
  kotaInfo: state.cart.kota,
  provinsiInfo: state.cart.provinsi,
  originToInfo: state.cart.originTo,
  emailInfo: state.cart.email,
  kurirInfo: state.cart.kurir,
  costInfo: state.cart.costs,
  waktuKirimInfo: state.cart.waktuKirim,
  serviceInfo: state.cart.service,
  isLoading: state.cart.isLoading,
});

const ActionCreators = Object.assign({}, cartActions);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreen);
