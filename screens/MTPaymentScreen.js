import React, { Component } from "react";
import { WebView } from "react-native-webview";
import { connect } from "react-redux";
import { format } from "date-fns";
import { bindActionCreators } from "redux";
import * as cartActions from "../redux/actions/cartActions";
import { View, ActivityIndicator, Alert, Button, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../config/colors";
import { ScrollView } from "react-native";
// const emvqr = require('emvqr');

const midtransClient = require('midtrans-client');

class MTPaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      action1: null,
      action2: null,
      action3: null,
      action4: null,
      dataSource: null,
      BarcodeShow: false,
      orderId: null
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Pembayaran",
    headerTitleStyle: {
      textAlign: "center",
    },
  });

  componentDidMount() {
    const { cartItems } = this.props
    let core = new midtransClient.CoreApi({
      isProduction: false,
      // clientKey: 'SB-Mid-client-mnLvmg2qlesesupI',
      // serverKey: 'SB-Mid-server-a-hEcMlSP394Xh_KO605M2GV'
      clientKey: 'SB-Mid-client-eBzi7ynvsBof__UV',
      serverKey: 'SB-Mid-server-VQ2xYlX_d3ROTMurn_XlYY7L'
    });

    let time = format(new Date(), "yyMMddHHmmss");
    let orderId = `G959400119/${time}${Math.floor(Math.random() * 100)}`;
    this.setState({
      orderId: orderId
    })
    let newCartItems = [];
    cartItems.forEach(item => {
      if (item.checked === "check") {
        newCartItems.push({
          id: item.idproduct,
          price: parseInt(item.sellprice),
          quantity: parseInt(item.qty),
          name: item.name,
          brand: "genioo",
          category: "product",
          merchant_name: "genioo"
        })
      }
    })

    newCartItems.push({
      id: this.props.kurirInfo + orderId,
      price: this.props.costInfo,
      quantity: 1,
      name: "Jasa Kurir" + " " + this.props.kurirInfo + " " + "dengan" + " " + "Service" + " " + this.props.serviceInfo,
      brand: "Raja Ongkir",
      category: "Kurir",
      merchant_name: "Raja Ongkir"
    })

    let parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: this.props.totalCost,
      },
      "payment_type": "gopay",
      "gopay": {
        "enable_callback": true,                // optional
        "callback_url": "someapps://callback"   // optional
      },
      customer_details: {
        first_name: this.props.penerimaAwal,
        last_name: this.props.penerimaAkhir,
        email: this.props.emailInfo,
        phone: this.props.teleponInfo,
        billing_address: {
          first_name: this.props.penerimaAwal,
          last_name: this.props.penerimaAkhir,
          email: this.props.emailInfo,
          phone: this.props.teleponInfo,
          address: this.props.alamatInfo,
          city: this.props.kotaInfo,
          postal_code: this.props.postal_code,
          country_code: "IDN",
        },
      },
      item_details: newCartItems,
      shipping_address: {
        first_name: "TEST",
        last_name: "MIDTRANSER",
        email: "test@midtrans.com",
        phone: "0 8128-75 7-9338",
        address: "Sudirman",
        city: "Jakarta",
        postal_code: "12190",
        country_code: "IDN"
      },
    };

    // charge transaction
    core.charge(parameter)
      .then((chargeResponse) => {
        this.setState({
          isLoading: false,
          action1: chargeResponse.actions[0].url,
          action2: chargeResponse.actions[1].url,
          action3: chargeResponse.actions[2].url,
          action3: chargeResponse.actions[3].url,
          dataSource: chargeResponse
        })
        console.log('charge1:', this.state.action1);
        console.log('chargeResponse:', chargeResponse);
      })
      .catch(err => {
        alert(err)
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
          <ActivityIndicator style={{ size: "large" }} />
        </View>
      )
    }
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View style={{
              borderColor: colors.primary,
              borderWidth: 1,
              backgroundColor: colors.primary,
              paddingHorizontal: 20
            }}>
              <Text style={{
                color: colors.white,
                fontWeight: "bold",
                margin: 10,
                textAlign: "center"
              }}>Scan Barcode</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Image
                style={{
                  height: 300,
                  Width: 150
                }}
                source={{ uri: this.state.action1 }} />
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  color: colors.gray
                }}
              >ID ORDER : {this.state.orderId}</Text>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  color: colors.black,
                  fontWeight: "bold"
                }}
              >Rp. {this.props.totalCost}</Text>
            </View>
          </View >
          <View style={{
            borderColor: colors.primary,
            backgroundColor: colors.primary,
            flex: 1
          }}>
            <Text style={{
              color: colors.white, fontWeight: "bold", margin: 10, textAlign: "center"
            }}>E-Wallet</Text>
          </View>
          <TouchableOpacity onPress={() =>
            this.props.navigation.navigate("WebView", { url: this.state.action1 })}>
            <View style={{
              borderColor: colors.primary,
              borderWidth: 1,
              backgroundColor: colors.white,
              borderRadius: 20,
              margin: 5,
              paddingHorizontal: 20
            }}>
              <Text style={{
                color: colors.primary, fontWeight: "bold", margin: 10, textAlign: "center"
              }}>Go-Pay</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>
            this.props.navigation.navigate("WebView", { url: this.state.action2 })}>
            <View style={{
              borderColor: colors.primary,
              borderWidth: 1,
              backgroundColor: colors.white,
              borderRadius: 20,
              margin: 5,
              paddingHorizontal: 20
            }}>
              <Text style={{
                color: colors.primary, fontWeight: "bold", margin: 10, textAlign: "center"
              }}>Dana</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>
            this.props.navigation.navigate("WebView", { url: this.state.action2 })}>
            <View style={{
              borderColor: colors.primary,
              borderWidth: 1,
              backgroundColor: colors.white,
              borderRadius: 20,
              margin: 5,
              paddingHorizontal: 20
            }}>
              <Text style={{
                color: colors.primary, fontWeight: "bold", margin: 10, textAlign: "center"
              }}>LinkAja</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>
            this.props.navigation.navigate("WebView", { url: this.state.action2 })}>
            <View style={{
              borderColor: colors.primary,
              borderWidth: 1,
              backgroundColor: colors.white,
              borderRadius: 20,
              margin: 5,
              paddingHorizontal: 20
            }}>
              <Text style={{
                color: colors.primary, fontWeight: "bold", margin: 10, textAlign: "center"
              }}>OVO</Text>
            </View>
          </TouchableOpacity>
          <View style={{
            borderColor: colors.primary,
            backgroundColor: colors.primary,
            flex: 1
          }}>
            <Text style={{
              color: colors.white, fontWeight: "bold", margin: 10, textAlign: "center"
            }}>Card</Text>
          </View>
          <TouchableOpacity onPress={() =>
            this.props.navigation.navigate("WebView", { url: this.state.action2 })}>
            <View style={{
              borderColor: colors.primary,
              borderWidth: 1,
              backgroundColor: colors.white,
              borderRadius: 20,
              margin: 5,
              paddingHorizontal: 20
            }}>
              <Text style={{
                color: colors.primary, fontWeight: "bold", margin: 10, textAlign: "center"
              }}>BCA</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>
            this.props.navigation.navigate("WebView", { url: this.state.action2 })}>
            <View style={{
              borderColor: colors.primary,
              borderWidth: 1,
              backgroundColor: colors.white,
              borderRadius: 20,
              margin: 5,
              paddingHorizontal: 20
            }}>
              <Text style={{
                color: colors.primary, fontWeight: "bold", margin: 10, textAlign: "center"
              }}>MANDIRI</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>
            this.props.navigation.navigate("WebView", { url: this.state.action2 })}>
            <View style={{
              borderColor: colors.primary,
              borderWidth: 1,
              backgroundColor: colors.white,
              borderRadius: 20,
              margin: 5,
              paddingHorizontal: 20
            }}>
              <Text style={{
                color: colors.primary, fontWeight: "bold", margin: 10, textAlign: "center"
              }}>CMB</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>
            this.props.navigation.navigate("WebView", { url: this.state.action2 })}>
            <View style={{
              borderColor: colors.primary,
              borderWidth: 1,
              backgroundColor: colors.white,
              borderRadius: 20,
              margin: 5,
              paddingHorizontal: 20
            }}>
              <Text style={{
                color: colors.primary, fontWeight: "bold", margin: 10, textAlign: "center"
              }}>BRI</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>
            this.props.navigation.navigate("WebView", { url: this.state.action2 })}>
            <View style={{
              borderColor: colors.primary,
              borderWidth: 1,
              backgroundColor: colors.white,
              borderRadius: 20,
              margin: 5,
              paddingHorizontal: 20
            }}>
              <Text style={{
                color: colors.primary, fontWeight: "bold", margin: 10, textAlign: "center"
              }}>BNI</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("WebView", { value: "" })}>
            <View style={{
              borderColor: colors.primary,
              borderWidth: 1,
              backgroundColor: colors.primary,
              borderRadius: 20,
              margin: 5,
              paddingHorizontal: 20
            }}>
              <Text style={{
                color: colors.white, fontWeight: "bold", margin: 10, textAlign: "center"
              }}>Menu Pembayaran Lainnya</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(MTPaymentScreen);
