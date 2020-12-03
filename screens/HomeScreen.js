import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";
import { ThemeProvider } from "react-native-elements";
import { FastImage } from "react-native-fast-image";
import { TextInput } from "react-native-gesture-handler";
import { SliderBox } from "react-native-image-slider-box";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import colors from "../config/colors";
import CartScreen from "../komponen/Cart.component";
import NotifScreen from "../komponen/Notif.component";
import * as cartActions from "../redux/actions/cartActions";
import * as profileActions from "../redux/actions/profileActions";
import * as productAction from "../redux/actions/productAction";
// eslint-disable-next-line import/no-named-as-default-member
import { styles, stylesButton } from "../styles/HomeScreenStyles";
import LogoHeader from "./logoHeader";
import { RefreshControl } from "react-native";

const theme = {
  colors: {
    primary: "#000",
  },
};

class HomeScreen extends React.Component {
  // eslint-disable-next-line react/sort-comp
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      images: [
        "https://genio.co.id/genioo/asset/foto_produk/kitab-suci-alquran.jpg",
        "https://genio.co.id/genioo/asset/foto_produk/habbatussauda169.jpeg",
        "https://genio.co.id/genioo/asset/foto_produk/Madu11.jpg",
        "https://genio.co.id/genioo/asset/foto_produk/baju-koko.jpg",
        "https://genio.co.id/genioo/asset/foto_produk/tasbih.jpg",
      ],
      show: false,
      show2: true,
      show3: true,
      show4: true,
      id_user: "",
      dataSource: null,
      isLoading: false,
      loadingListSearch: false,
      refreshing: false
    };
    this.arrayholder = [];
    this.arrayholder1 = [];
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.componentDidMount().then(() => {
      this.setState({
        refreshing: false
      })
    })
  }

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

  onScreenFocus = () => {
    // Screen was focused, our on focus logic goes here
    this.myRef.current.scrollTo(0, 0);
  }

  async componentDidMount() {
    this.props.navigation.setParams({
      tapOnTabNavigator: this.onScreenFocus
    })

    const dataCity = await AsyncStorage.getItem("dataCity");
    console.log("data city : ", dataCity)
    if (dataCity !== null) {
      this.props.actions.setInfoCity(dataCity)
    } else { this.props.actions.fetchCity() }

    fetch("https://genio.co.id/geniooapi/api/product")
      .then(response => response.json())
      .then(responseJson => {
        let dataAdd = [];
        let dataNoAdd = [];
        responseJson.forEach(item => {
          if (item.ads === "1") {
            dataAdd.push(item)
          }
        })

        responseJson.forEach(item => {
          if (item.ads === "0") {
            dataNoAdd.push(item)
          }
        })

        let newData = [];
        this.shuffleDeck(dataAdd);
        this.shuffleDeck(dataNoAdd);

        newData.push(...dataAdd, ...dataNoAdd)

        console.log("data response", newData)

        // const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        // const randomMonth = months[Math.floor(Math.random() * months.length)];

        // console.log("random month =>", randomMonth);
        this.setState(
          {
            isLoading: false,
            dataSource: newData,
            refreshing: false
          },
          function () {
            this.arrayholder = newData;
          }
        );

        this.props.produk.fetchProducts(this.arrayholder);
        // const componentList = (this.arrayholder) => {};
      })
      .catch(error => {
        console.error(error);
      });
    const id_user = await AsyncStorage.getItem("id_konsumen");
    if (id_user == undefined || id_user == "") {
      // const data = [];
      // this.props.actions.logoutCartData(data);
    } else {
      this.props.actionsProfile.fetchProfileData(id_user);
      this.setState({
        id_user: id_user,
      });
      await fetch("https://genio.co.id/geniooapi/api/Cartitems/detail_cartitems?buyerid=" + id_user, {
        method: "GET",
      }
      )
        .then(response => response.json())
        .then(responseJson => {

          const data = [responseJson]

          this.props.actions.setCartData(data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
  static navigationOptions = () => ({
    header: null,
  });

  static navigationOptions = () => ({
    header: null,
  });

  // function Filter, cari berdasarkan Nama Produk
  SearchFilter = Cari => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = Cari.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
    });
    if (this.state.isLoading == true) {

    }
  };

  SearchFilterButton = () => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.type.toUpperCase()}`;
      const textData = String("hot_product").toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      show: true,
      show2: false,
      show3: false,
      show4: false,
    });
  };

  SearchFilterButton1 = () => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.type.toUpperCase()}`;
      const textData = String("new_product").toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      show: true,
      show2: false,
      show3: false,
      show4: false,
    });
  };

  SearchFilterButton2 = () => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.type.toUpperCase()}`;
      const textData = String("best_seller").toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      show: true,
      show2: false,
      show3: false,
      show4: false,
    });
  };

  SearchFilterButton3 = () => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.type.toUpperCase()}`;
      const textData = String("").toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      show: false,
      show2: true,
      show3: true,
      show4: true,
    });
  };

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

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  render() {
    const { productItems, cartItems } = this.props;
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <ThemeProvider theme={theme}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LogoHeader />
          <TextInput
            type="Search"
            style={styles.IsiCari}
            underlineColorAndroid={colors.white}
            className="Input"
            placeholderTextColor={colors.gray}
            placeholder="Cari Produk atau Penjual"
            onChangeText={Cari => this.SearchFilter(Cari)}
            autoCorrect={false}
          />
          <CartScreen navigation={this.props.navigation} item={this.state.dataSource} />
          <NotifScreen navigation={this.props.navigation} />
        </View>

        <SafeAreaView>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
            ref={this.myRef}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />}
          >
            <View style={styles.container}>
              <SliderBox
                ImageComponent={FastImage}
                images={this.state.images}
                sliderBoxHeight={150}
                onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                dotColor="#00CED1"
                inactiveDotColor="#ffffff"
                autoplay
                circleLoop
                resizeMethod="resize"
                resizeMode="cover"
                paginationBoxStyle={{
                  position: "absolute",
                  bottom: 0,
                  padding: 0,
                  alignItems: "center",
                  alignSelf: "center",
                  justifyContent: "center",
                  elevation: 6,
                }}
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  padding: 0,
                  margin: 0,
                  backgroundColor: "rgba(128, 128, 128, 0.92)",
                }}
                ImageComponentStyle={{
                  width: "100%",
                }}
                imageLoadingColor="#00CED1"
              />
              <View style={styles.headerBannerContainer}></View>
              <View style={styles.linkContainer}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.push("Sarana", {
                    titleHeader: "Perangkat Ibadah",
                    categoryname: "Alat"
                  })}
                  style={styles.linkCardOut}
                >
                  <View style={styles.linkCard}>
                    <Image
                      raised
                      source={require("../image/carpet.png")}
                      style={styles.cardMenu}
                    />
                  </View>
                  <Text style={styles.linkText}>Perangkat Ibadah</Text>
                </TouchableOpacity>
                <View style={styles.blankSpace} />
                <TouchableOpacity
                  onPress={() => this.props.navigation.push("Sarana", {
                    titleHeader: "Busana Muslim",
                    categoryname: "Busana"
                  })}
                  style={styles.linkCardOut}
                >
                  <View style={styles.linkCard}>
                    <Image
                      raised
                      source={require("../image/clothes.png")}
                      style={styles.cardMenu}
                    />
                  </View>
                  <Text style={styles.linkText}>Busana Muslim</Text>
                </TouchableOpacity>
                <View style={styles.blankSpace} />
                <TouchableOpacity
                  onPress={() => this.props.navigation.push("Sarana", {
                    titleHeader: "Konsumsi",
                    categoryname: "Obat"
                  })}
                  style={styles.linkCardOut}
                >
                  <View style={styles.linkCard}>
                    <Image
                      raised
                      source={require("../image/fork.png")}
                      style={styles.cardMenu}
                    />
                  </View>
                  <Text style={styles.linkText}>Konsumsi</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.linePrimary} />
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-around",
                  flexDirection: "row",
                  width: "100%",
                  marginBottom: 5,
                }}
              >
                <TouchableOpacity onPress={this.SearchFilterButton3}>
                  {this.state.show ? (
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: "#00CED1",
                        height: 30,
                        alignSelf: "center",
                        width: 30,
                        borderRadius: 50,
                      }}
                    >
                      <Text style={styles.textLabelType}>X</Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-around",
                  flexDirection: "row",
                  width: "100%",
                  marginBottom: 5,
                }}
              >
                <TouchableOpacity onPress={this.SearchFilterButton}>
                  {this.state.show2 ? (
                    <View style={styles.typeLabel}>
                      <Text style={styles.textLabelType}>Hot Product</Text>
                    </View>
                  ) : null}
                </TouchableOpacity>

                <TouchableOpacity onPress={this.SearchFilterButton1}>
                  {this.state.show3 ? (
                    <View style={styles.typeLabel}>
                      <Text style={styles.textLabelType}>New Product</Text>
                    </View>
                  ) : null}
                </TouchableOpacity>

                <TouchableOpacity onPress={this.SearchFilterButton2}>
                  {this.state.show4 ? (
                    <View style={styles.typeLabel}>
                      <Text style={styles.textLabelType}>Best Seller</Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              </View>

              <FlatList
                style={styles.productsGridContainer}
                data={this.state.dataSource}
                extraData={this.props}
                ItemSeparatorComponent={this.renderSeparator}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (

                  <TouchableOpacity style={styles.productGridItem} onPress={() => this.props.navigation.push("Product", {
                    key: item.idproduct,
                    itemDetail: item,
                  })}>
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
                                // onPress={() => dispatch(increment(globalState.counter.itemsQty + 1))}
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
                onEndReachedThreshold={4}
                onEndReached={({ distanceFromEnd }) => {
                  console.log("test", distanceFromEnd)
                }}
              />
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ThemeProvider>
    );
  }
}


export const { width, height } = Dimensions.get("window");
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

export default (connect(mapStateToProps, mapDispatchToProps)(HomeScreen));
