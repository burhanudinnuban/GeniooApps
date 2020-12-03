import Icon from 'react-native-vector-icons/FontAwesome'
import { AlertHelper } from './AlertHelper';
import { format, isThisSecond } from "date-fns";
import React, { Component } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View, Alert, ActivityIndicator } from "react-native";
import { Button, Image, ThemeProvider } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Swipeout from "react-native-swipeout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AsyncStorage from "@react-native-community/async-storage";
import { useSelector } from "react-redux";
import * as profileActions from "../redux/actions/profileActions";
import * as cartActions from "../redux/actions/cartActions";
import * as productAction from "../redux/actions/productAction";
import { styles, theme } from "../styles/CartScreenStyles";
import CheckBox from 'react-native-check-box';
// import PaymentGateway from 'react-native-midtrans-payment';

class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yuerel: "",
      count: 0,
      isLoading: false
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Keranjang",
    headerTitleStyle: {
      textAlign: "center",
    },
  });

  onClick(item) {
    const itemDetail = item;
    if (item.checked !== '') {
      const newItemDetail = { ...itemDetail, checked: '' };
      this.props.actions.uncheckedItemToPayData(newItemDetail);
    }
    else {
      const newItemDetail = { ...itemDetail, checked: 'check' };
      this.props.actions.checkedItemToPayData(newItemDetail);
    }
  }

  async emptyCart(item) {
    const id_user = await AsyncStorage.getItem('id_konsumen');
    if (id_user == undefined || id_user == '') {
      this.props.actions.emptyCartUnlogin(item);
    }
    else {
      this.props.actions.emptyCartData(item);
      this.setState({ count: this.state.count + 1 });
    }
  }

  async upItemToCart(item) {
    const itemDetail = item;
    const id_user = await AsyncStorage.getItem('id_konsumen');
    if (id_user == undefined || id_user == '') {
      this.props.actions.updateItemToCartUnlogin(itemDetail);
    }
    else {
      const newItemDetail = { ...itemDetail, qtyy: 1 };
      this.props.actions.updateItemToCartData(newItemDetail);
      this.setState({ count: this.state.count + 1 });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const id_user = await AsyncStorage.getItem('id_konsumen');
    if (prevState.count !== this.state.count) {
      this.props.produk.fetchDataProduct(id_user);
    }
  }

  async minusItemToCart(item) {
    const itemDetail = item;
    const id_user = await AsyncStorage.getItem('id_konsumen');
    if (id_user == undefined || id_user == '') {
      if (item.qty == 1) {
        this.props.actions.removeItemUnlogin(itemDetail);
      } else {
        this.props.actions.deleteItemUnlogin(itemDetail);
      }
    }
    else {
      if (item.qty == 1) {
        const newItemDetail = { ...itemDetail, qtyy: 1 };
        this.props.actions.removeItemData(newItemDetail);
        this.props.produk.fetchDataProduct(item.buyerid);
      } else {
        const newItemDetail = { ...itemDetail, qtyy: 1 };
        this.props.actions.deleteItemData(newItemDetail);
        this.props.produk.fetchDataProduct(item.buyerid);
      }
      this.setState({ count: this.state.count + 1 });
    }
  }

  async componentDidMount() {
    const { cartItems, actions, cartTotal } = this.props;
    const id_user = await AsyncStorage.getItem('id_konsumen');
    this.props.Profile.fetchProfileData(id_user)
    if (id_user == undefined || id_user == '') {
      if (this.props.cartItems.length > 0) {
      }
      else {
        const data = [];
        actions.fetchCartDataUnlogin(data);
      }
    }
    else {
      actions.fetchCartData(id_user);
    }
    this.props.produk.fetchDataProduct(id_user);
  }

  loginFromCart() {
    this.props.navigation.navigate("Login")
    this.props.Profile.loginFromCart(1)
  }

  async checkOrigin() {
    const penerimaAwal = await AsyncStorage.getItem("penerimaAwal");
    const penerimaAkhir = await AsyncStorage.getItem("penerimaAkhir");
    const alamat = await AsyncStorage.getItem("alamat");
    const telepon = await AsyncStorage.getItem("telepon");
    const email = await AsyncStorage.getItem("email");
    const postal_code = await AsyncStorage.getItem("postal_code");
    const kota = await AsyncStorage.getItem("kota");
    const provinsi = await AsyncStorage.getItem("provinsi");
    const originTo = await AsyncStorage.getItem("originTo");
    const id_user = await AsyncStorage.getItem('id_konsumen');
    const item = {
      penerimaAwal: penerimaAwal,
      penerimaAkhir: penerimaAkhir,
      alamat: alamat,
      telepon: telepon,
      kota: kota,
      provinsi: provinsi,
      originTo: originTo,
      email: email,
      postal_code: postal_code,
    }

    this.props.Profile.fetchProfileData(id_user)
    if (this.props.cartTotal !== 0) {
      if (id_user == undefined) {
        Alert.alert(
          "Anda Belum Masuk",
          "Apakah Anda Ingin Masuk Sekarang ?",
          [
            { text: 'Nanti', onPress: () => console.log('No button clicked'), style: 'cancel' },
            { text: 'Ya, Masuk', onPress: () => this.loginFromCart() },
          ],
          {
            cancelable: true
          }
        );
        return false;
      } else {
        this.setState({
          isLoading: true
        });
        if (originTo !== null) {
          await fetch("https://api.rajaongkir.com/starter/cost",
            {
              method: "POST",
              headers: {
                key: "cf91d83df6f437bd200ec7495b6f2687",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                // ini parameternya
                origin: "154",
                destination: originTo,
                weight: "5",
                courier: "jne",
              }),
            })
            .then(resp => resp.json())
            .then(responseJson => {
              const cartData = [responseJson];
              this.props.actions.setInfoCost(cartData[0].rajaongkir);
              setTimeout(() => {
                this.props.actions.setTotalCost()
                this.setState({
                  isLoading: false
                })
                this.props.navigation.navigate("Checkout")
              }, 1500);
            })
            .catch(err => {
              alert(err)
            })
          this.props.actions.addDataCheckout(item);
        } else {
          setTimeout(() => {
            this.setState({
              isLoading: false
            })
            this.props.navigation.navigate("FormDataPengiriman")
          }, 1500);

        }
      }
    }
    else {
      AlertHelper.show('error', 'Cart Kosong', 'Silahkan isi cart')
      //this.dropDownAlertRef.alertWithType();
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
          <ActivityIndicator style={{ size: "large" }} />
        </View>
      )
    }
    const { cartItems, cartTotal, itemsQty, navigation, productItems } = this.props;
    console.log(productItems);
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
                                onPress={() => this.emptyCart(item)}
                                // onPress={() => { this.props.removeItem({items})}}
                                // onPress={()=>(this.swipeHandleDelete())}
                                style={styles.deleteIconContainer}
                              >
                                <Icon name="trash" size={28} color="#F05829" />
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
                          <CheckBox
                            style={{ flex: 0, padding: 10 }}
                            onClick={() => this.onClick(item)}
                            isChecked={item.checked}
                          />
                          <TouchableOpacity onPress={() => this.props.navigation.navigate("Product", {
                            key: item.idproduct,
                            itemDetail: item
                          })}>
                            <Image
                              source={{ uri: item.photomainpath }}
                              style={styles.productImage}
                            />
                          </TouchableOpacity>
                          <View style={styles.productContent}>
                            <Text style={styles.productTitle}>{item.name}</Text>
                            <Text style={styles.productTitleDesc}>{item.descriptionshort}</Text>
                            <View style={styles.priceRow}>
                              <Text style={styles.actualPrice}>Rp.{parseFloat(item.sellprice)}</Text>
                            </View>
                            <View style={styles.priceRow}>
                              <Text style={styles.actualPriceTotal}>Rp.{item.sellprice * item.qty}</Text>
                            </View>
                          </View>
                          <View style={styles.productCountButtons}>
                            <Button
                              buttonStyle={styles.plusButton}
                              titleStyle={styles.titleButtonStyle}
                              icon={<Ionicons name="plus" size={18} color="#000" />}
                              onPress={() => this.upItemToCart(item)}
                            />
                            <View style={styles.countValueContainer}>
                              <Text style={styles.countValueText}>{item.qty}</Text>
                            </View>
                            <Button
                              buttonStyle={styles.minusButton}
                              titleStyle={styles.titleButtonStyle}
                              icon={<Ionicons name="trash" size={18} color="#000" />}
                              onPress={() => this.minusItemToCart(item)}
                            />
                          </View>
                        </View>
                      </Swipeout>
                    </View>
                  )}
                />
                <Button
                  buttonStyle={styles.saveButton}
                  titleStyle={styles.titleButtonStyle}
                  title="PROSES PEMBELIAN"
                  icon={
                    <View style={styles.buttonIconContainer}>
                      {/* <Text style={styles.totalButtonText}>Total</Text> */}
                      <Text style={styles.totalButtonValue}>Rp.{cartTotal}</Text>
                    </View>
                  }
                  iconRight
                  onPress={() => this.checkOrigin()}
                  containerStyle={styles.saveButtonContainer}
                // onPress={() => this.props.navigation.navigate("Checkout")}
                // this.props.navigation.navigate("Checkout") => this._storeData
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
  cartItems: state.cart.cart,
  cartTotal: state.cart.totalCart,
  productItems: state.products.items,
  dataProfile: state.profile.dataProfile,
  OriginInfo: state.cart.originTo,
});
const ActionCreatorsProfile = Object.assign({}, profileActions)
const ActionCreators = Object.assign({}, cartActions);
const ProductCreators = Object.assign({}, productAction);

function mapDispatchToProps(dispatch) {
  return {
    Profile: bindActionCreators(ActionCreatorsProfile, dispatch),
    actions: bindActionCreators(ActionCreators, dispatch),
    produk: bindActionCreators(ProductCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
