import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import {
  ActivityIndicator,
  Alert, Dimensions, FlatList, StatusBar, StyleSheet,
  Text,
  TouchableOpacity, View
} from "react-native";
import { Button, Image, Rating, ThemeProvider } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import SwiperFlatList from "react-native-swiper-flatlist";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CartHeader from "../komponen/Cart.component";
import * as cartActions from "../redux/actions/cartActions";
import * as profileActions from "../redux/actions/profileActions";
import * as productAction from "../redux/actions/productAction";
import { styles, stylesButton } from "../styles/HomeScreenStyles";
import { id } from "date-fns/esm/locale";
// import  Product  from '../components/Product.component';

class ProductScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      isLoading: true,
      show: false,
      show2: true,
      show3: true,
      show4: true,
      productRekomendasi: null,
      itemDetail: this.props.navigation.state.params.itemDetail,
    };
    this.arrayholder = [];
  }

  async addItemToCart(Qty) {
    const id_user = await AsyncStorage.getItem("id_konsumen");
    if (id_user == undefined || id_user == '') {
      const itemDetail = this.state.itemDetail;
      const newItemDetail = { ...itemDetail, qtyy: 1, qty: 1, checked: 'check' };
      if (this.props.cartItems.every(item => item.idproduct !== this.state.itemDetail.idproduct)) {
        this.props.actions.addToCartUnlogin(newItemDetail);
      }
      else {
        this.props.actions.updateItemToCartUnlogin(newItemDetail);
      }

    }
    else {
      const itemDetail = this.state.itemDetail;
      const newItemDetail = { ...itemDetail, qtyy: Qty };
      if (this.props.cartItems.every(item => item.idproduct !== this.state.itemDetail.idproduct)) {
        this.props.actions.addToCartData(newItemDetail);
      }
      else {
        this.props.actions.updateItemToCartData(newItemDetail);
      }
      this.props.produk.fetchDataProduct(id_user);
    }
  }

  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <Button
        containerStyle={{
          marginLeft: 0,
        }}
        buttonStyle={{
          padding: 0,
          backgroundColor: "#fff",
          borderRadius: 40,
          width: 40,
          height: 40,
        }}
        type="clear"
        onPress={() => {
          navigation.goBack();
        }}
        icon={<Ionicons name="ios-arrow-back" size={18} color="#000" />}
      />
    ),
    headerRight: <CartHeader navigation={navigation} />,
    // headerStyle: {
    //   backgroundColor: "#fff",
    //   borderBottomWidth: 0,
    //   marginHorizontal: 24,
    //   elevation: 0,
    // },
    title: "Produk",
    headerTitleStyle: {
      fontFamily: "Roboto",
      fontSize: 18,
      textAlign: "center",
      flex: 1,
      color: "#00CC99",
    },
  });

  handleShow = () => {
    this.setState({
      show: false,
      show2: true,
      show3: true,
      show4: true,
    });
  };

  async decrementCounter(item, qty) {
    const itemDetail = item;
    const id_user = await AsyncStorage.getItem('id_konsumen');
    if (id_user == undefined || id_user == '') {
      if (qty == 1) {
        const newItemDetail = { ...itemDetail, qty: qty };
        this.props.actions.removeItemUnlogin(newItemDetail);
      } else {
        const newItemDetail = { ...itemDetail, qty: qty };
        this.props.actions.deleteItemUnlogin(newItemDetail);
      }
    }
    else {
      if (qty == 1) {
        const newItemDetail = { ...itemDetail, qty: qty };
        this.props.actions.removeItemData(newItemDetail);
      } else {
        const newItemDetail = { ...itemDetail, qty: qty };
        this.props.actions.deleteItemData(newItemDetail);
      }
    }
  }

  async incrementCounter(item, qty) {
    const id_user = await AsyncStorage.getItem('id_konsumen');
    const itemDetail = item;
    if (id_user == undefined || id_user == '') {
      const newItemDetail = { ...itemDetail, qty: qty };
      this.props.actions.updateItemToCartUnlogin(newItemDetail);
    }
    else {
      const newItemDetail = { ...itemDetail, qty: qty };
      this.props.actions.updateItemToCartData(newItemDetail);
    }

  }

  ListEmpty = () => {
    const { Cari } = this.state;
    return (
      // View to show when list is empty
      <View style={styles.ListEmpty}>
        <Text style={styles.TextEmpty}>Sorry, no data found for your search</Text>
        <Text>{Cari}</Text>
      </View>
    );
  };

  async showHideBeli(item) {
    const id_user = await AsyncStorage.getItem('id_konsumen');
    const itemDetail = item;
    if (id_user == undefined || id_user == '') {
      const newItemDetail = { ...itemDetail, qtyy: 1, qty: 1, checked: 'check' };
      this.props.actions.addToCartUnlogin(newItemDetail);
    }
    else {
      const newItemDetail = { ...itemDetail, qtyy: 1 };
      this.props.actions.addToCartData(newItemDetail);
    }
    this.componentDidMount;
  }

  shuffleDeck = (array) => {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  async componentDidMount() {
    const { itemDetail } = this.state;
    fetch("https://genio.co.id/geniooapi/api/product")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
          },
          function () {
            this.arrayholder = responseJson;
          }
        );
        this.shuffleDeck(responseJson);
        const newData = this.arrayholder.filter(item => {
          const itemData = `${item.categoryname.toUpperCase()}`;
          const textData = itemDetail.categoryname.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        let newResponse = [];
        newData.forEach(item => {
          if (item.idproduct !== itemDetail.idproduct) {
            newResponse.push(
              item
            )
          }
        })
        this.setState({
          productRekomendasi: newResponse,
        });
        this.props.produk.fetchProducts(newData);

        // const componentList = (this.arrayholder) => {};
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { cartItems } = this.props;
    const { itemDetail } = this.state;
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <ThemeProvider theme={theme}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.swiperPicContainer}>
            <Image source={{ uri: itemDetail.photomainpath }} style={styles.productSwiperPic} />
          </View>
          <View style={styles.container}>
            <View style={styles.productContent}>
              <Text style={styles.productTitle}>{itemDetail.name}</Text>
              <Text style={styles.productDesc}>{itemDetail.descriptionshort}</Text>
              <Text style={styles.oldPrice}>Rp.{itemDetail.price}</Text>
              <Text style={styles.actualPrice}>Rp.{itemDetail.sellprice}</Text>
              <Text style={styles.stock}>
                Berat: {this.state.weight} KG - Tersedia{" "}
                {this.state.stock} {itemDetail.stock}
              </Text>
            </View>

            <Button
              buttonStyle={styles.saveButton}
              titleStyle={styles.titleButtonStyle}
              title="Add to chart"
              icon={
                <View style={styles.appleLogoButtonContainer}>
                  <Text style={styles.priceInsideButtonText}>
                    Rp.{itemDetail.sellprice}
                  </Text>
                </View>
              }
              iconRight
              onPress={() => this.addItemToCart(1)}
            />
            <View>
              <Text style={styles.titleproduct}>
                Penjual : {itemDetail.sellername}
              </Text>
              <Rating imageSize={20} readonly startingValue="4.5" style={styles.ratingContainer} />
              <Text style={styles.productfull}>Alamat : {itemDetail.city}</Text>
            </View>
            <View>
              <Text style={styles.titleproduct}>Deskripsi :</Text>
              <Text style={styles.productfull}>{itemDetail.descriptionfull}</Text>
            </View>
            <View style={styles.tabsContainer}>

              <Button
                buttonStyle={styles.tabButton}
                titleStyle={styles.titleTabButton}
                title="Reviews"
                icon={<Ionicons name="ios-arrow-round-forward" size={20} color="#000" />}
                iconRight
                type="clear"
                containerStyle={styles.saveButtonContainer}
                onPress={() => this.props.navigation.navigate("Reviews")}
              />
            </View>
            <View style={styles.relatedItemsHeadingContainer}>
              <Text style={styles.relatedItemsHeading}>Rekomendasi</Text>
            </View>
          </View>
          <View style={styles.relatedItemsCardsContainer}>
            <FlatList
              style={styles.productsGridContainer}
              data={this.state.productRekomendasi}
              extraData={this.props}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.productGridItem}
                  onPress={() => this.props.navigation.replace("Product", {
                    key: item.idproduct,
                    itemDetail: item,
                  })}
                >
                  <View style={styles.container1}>
                    <Image style={styles.imageProductGridItem} source={{ uri: item.photomainpath }} />
                    <View style={styles.imageProductLabel}>
                      <Text style={styles.textLabel}>{item.label}</Text>
                    </View>
                  </View>
                  <View style={stylesButton.container}>
                    <Text style={styles.priceRow}>{item.name}</Text>
                    <Text style={[styles.titleProductGridItem]}>{item.descriptionshort}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.actualPrice}> Rp.{item.sellprice}</Text>
                      <Text style={styles.oldPrice}>Rp.{item.price}</Text>
                    </View>
                    <Text style={styles.titleProductGridItem}>Stock : {item.stock}</Text>
                    <Text style={[styles.titleProductGridItem]}>{item.city}</Text>
                    {cartItems.map((cart, index) =>
                      cart.qty && cart.idproduct == item.idproduct ? (
                        <View style={styles.buttonWrapper}>
                          <View style={styles.buttonPlusMinus}>
                            <TouchableOpacity onPress={() => this.decrementCounter(item, cart.qty)}>
                              <View
                                style={{
                                  alignItems: "center",
                                  backgroundColor: "#00CED1",
                                  width: 30,
                                  height: 30,
                                  textAlign: "center",
                                  borderRadius: 20,
                                  elevation: 4,
                                }}
                              >
                                <Text
                                  style={{
                                    color: "white",
                                    textAlignVertical: "center",
                                    height: 30,
                                  }}
                                >
                                  -
                          </Text>
                              </View>
                            </TouchableOpacity>

                            <Text>{cart.qty}</Text>

                            <TouchableOpacity
                              onPress={() => this.incrementCounter(item, cart.qty)}
                            >
                              <View
                                style={{
                                  alignItems: "center",
                                  backgroundColor: "#00CED1",
                                  width: 30,
                                  height: 30,
                                  textAlign: "center",
                                  borderRadius: 20,
                                  elevation: 4,
                                }}
                              >
                                <Text
                                  style={{
                                    color: "white",
                                    textAlignVertical: "center",
                                    height: 30,
                                  }}
                                >
                                  +
                          </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      ) : null
                    )}
                    {cartItems.some(cart => cart.idproduct === item.idproduct) ? null : (
                      <TouchableOpacity onPress={() => this.showHideBeli(item)}>
                        <View
                          style={{
                            alignItems: "center",
                            alignContent: "space-between",
                            backgroundColor: "#00CED1",
                            flex: 1,
                            height: 30,
                            borderRadius: 15,
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              textAlignVertical: "center",
                              height: 25,
                            }}
                          >
                            BELI
                    </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
              )}
              ListEmptyComponent={this.ListEmpty}
            />
          </View>
        </KeyboardAwareScrollView>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  cartItems: state.cart.cart,
  productItems: state.products.items,
  cartTotal: state.cart.total,
  infoUser: state.profile.dataProfile,
  user_id: state.profile.id_user,
});

const ActionCreatorsProfile = Object.assign({}, profileActions);
const ActionCreators = Object.assign({}, cartActions);
const ProductCreators = Object.assign({}, productAction);

function mapDispatchToProps(dispatch) {
  return {
    actionsProfile: bindActionCreators(ActionCreatorsProfile, dispatch),
    actions: bindActionCreators(ActionCreators, dispatch),
    produk: bindActionCreators(ProductCreators, dispatch),
  };
}
export const { width, height } = Dimensions.get("window");
export default (connect(mapStateToProps, mapDispatchToProps)(ProductScreen));

const theme = {
  colors: {
    primary: "gold",
  },
};
