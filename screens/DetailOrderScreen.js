import { Feather, Ionicons, FontAwesome } from "@expo/vector-icons";
import React from "react";
import { 
  ActivityIndicator, 
  Alert, 
  Text, 
  TouchableOpacity, 
  View,
  Clipboard } from "react-native";
import { Button, CheckBox, Image, Input, ThemeProvider } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { styles } from "../styles/DetailOrderStyles";
import AsyncStorage from "@react-native-community/async-storage";
import * as profileActions from "../redux/actions/profileActions";
import * as cartActions from "../redux/actions/cartActions";
import * as productAction from "../redux/actions/productAction";
// import {NavigationActions} from 'react-navigation';

const theme = {
  colors: {
    primary: "#000",
  },
};

class DetailOrderScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: 0
    };
    }

  async componentDidMount() {
      
  }
  render() {
    const { waktu} = this.state;
    return (
      <ThemeProvider theme={theme}>        
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
            >
              <View style={styles.containerText}>
                <Text style={styles.descriptionScreenStyle}>
                    Metode Pembayaran
                </Text>
                <Text style={styles.titleMerchantStyle}>
                    Alfamart/Alfamidi/Lawson
                </Text>
              </View>
              <View style={styles.line} />
              <View style={styles.containerText}>
                <Text style={styles.descriptionScreenStyle}>
                      Total Harga (1 Barang)
                </Text>
                <Text style={styles.totalPriceStyle}>
                      Rp46.000
                </Text>  
              </View>
              <View style={styles.containerText}>
                <Text style={styles.descriptionPriceStyle}>
                      Total Ongkos Kirim
                </Text>
                <Text style={styles.sellPriceStyle}>
                      Rp32.000
                </Text>  
              </View>
              <View style={styles.lineTipis} />
              <View style={styles.containerText}>
                <Text style={styles.descriptionScreenStyleBold}>
                      Total Tagihan
                </Text>
                <Text style={styles.sellPriceBold}>
                      Rp78.000
                </Text>  
              </View>
              <View style={styles.containerText}>
                <Text style={styles.descriptionPriceStyle}>
                      Biaya Layanan
                </Text>
                <Text style={styles.sellPriceStyle}>
                      Rp2.500
                </Text>  
              </View>
              <View style={styles.lineTipis} />
              <View style={styles.containerText}>
                <Text style={styles.totalTextPaymentStyle}>
                      Total Bayar
                </Text>
                <Text style={styles.totalPaymentStyle}>
                      Rp80.500
                </Text>  
              </View>
              <View style={styles.line} />
              <Text style={styles.titleStyle}>
                  Barang yang dibeli
              </Text>
              <Text style={styles.titleStoreStyle}>
                  Toko Fahmi
              </Text>
              
              <View style={styles.containerText}>
                <Text style={styles.titleProductStyle}>
                  Kurma 1Kg
                </Text> 
                <Text style={styles.totalPriceProductStyle}>
                  Rp46.000
                </Text> 
              </View>
              <Text style={styles.qtyPriceStyle}>
                  1 X Rp46.000
              </Text>
              <View style={styles.containerText}>
                <Text style={styles.descriptionPriceStyle}>
                  Ongkos Kirim
                </Text>
                <Text style={styles.totalPriceProductStyle}>
                  Rp32.000
                </Text>
              </View>
              <Text style={styles.kurirStyle}>
                  JNE
              </Text>
              <Text style={styles.addressStyle}>
                  Alamat Pengiriman
              </Text>
              <Text style={styles.nameAddressStyle}>
                      Gading Marpoyan BLOK A15 No.2
              </Text>
            </KeyboardAwareScrollView>
        </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  showInfo: state.profile.showLogin,
  showInfo1: state.profile.showProfile,
  cartItems: state.cart.cart,
  FromCart: state.profile.loginFromCart
});

const ActionCreatorsProfile = Object.assign({}, profileActions);
const ActionCreators = Object.assign({}, cartActions);
const ProductCreators = Object.assign({}, productAction);

const mapDispatchToProps = dispatch => ({
  actionsProfile: bindActionCreators(ActionCreatorsProfile, dispatch),
  actions: bindActionCreators(ActionCreators, dispatch),
  produk: bindActionCreators(ProductCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailOrderScreen);
