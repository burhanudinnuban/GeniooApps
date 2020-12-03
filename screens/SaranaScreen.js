import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator, Dimensions, FlatList,
  SafeAreaView, Text,
  TouchableOpacity,
  View
} from "react-native";
import { Button, Image, Input, ThemeProvider } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../redux/actions/cartActions";
import * as productAction from "../redux/actions/productAction";
import * as profileActions from "../redux/actions/profileActions";
import { styles, stylesButton } from "../styles/HomeScreenStyles";
import CartScreen from "../komponen/Cart.component";

const theme = {
  colors: {
    primary: "#000",
  },
};

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //name: 0,
      //isLoading: true,
      Cari: "",
      images: [
        "https://genio.co.id/genioo/asset/foto_produk/kitab-suci-alquran.jpg",
        "https://genio.co.id/genioo/asset/foto_produk/habbatussauda169.jpeg",
        "https://genio.co.id/genioo/asset/foto_produk/Madu11.jpg",
        "https://genio.co.id/genioo/asset/foto_produk/baju-koko.jpg",
        "https://genio.co.id/genioo/asset/foto_produk/tasbih.jpg",
        // require('./assets/images/girl.jpg'),
      ], show: false,
      show2: true,
      show3: true,
      show4: true,
      id_user: "",
      dataSource: [],
      isLoading: false,
      loadingListSearch: false,
      titleHeader: this.props.navigation.state.params.titleHeader
    };
    this.arrayholder = [];
    this.arrayholder1 = [];
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
        icon={<Ionicons name="ios-arrow-back" size={20} color="#000" />}
      />
    ),
    headerRight: <CartScreen navigation={navigation} />,
    // headerRight: (
    //   <Input type="Search"
    //       containerStyle={styles.Cari}
    //       inputStyle={styles.IsiCari}
    //       className="Input"
    //       placeholder="Cari Produk atau Penjual"
    //       onChangeText={(Cari) => this.SearchFilter(Cari)}
    //   />
    // ),
    headerStyle: {
      backgroundColor: "#fff",
      borderBottomWidth: 0,
      marginHorizontal: 24,
      elevation: 0,
    },
    headerTransparent: false,
    title: navigation.state.params.titleHeader,
    headerTitleStyle: {
      fontFamily: "Roboto",
      fontSize: 18,
      textAlign: "justify",
      flex: 1,
      // marginTop: 20,
      color: "black",
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

  async componentDidMount() {
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

        const newData1 = newData.filter(item => {
          const itemData = `${item.categoryname.toUpperCase()}`;
          const textData = String(this.props.navigation.state.params.categoryname).toUpperCase();
          return itemData.indexOf(textData) > -1;
        });

        console.log(this.props.navigation.state.params.categoryname);

        // const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        // const randomMonth = months[Math.floor(Math.random() * months.length)];

        // console.log("random month =>", randomMonth);
        this.setState(
          {
            isLoading: false,
            dataSource: newData1
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
    this.SearchFilterSarana()
  }

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
        <View style={styles.search}>
          <Input
            type="Search"
            containerStyle={styles.CariSarana}
            inputStyle={styles.IsiCariSarana}
            className="Input"
            placeholder="Cari Produk atau Penjual"
            onChangeText={(Cari) => this.SearchFilter(Cari)}
          />
        </View>
        <SafeAreaView>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}>
            <View style={styles.container}>
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