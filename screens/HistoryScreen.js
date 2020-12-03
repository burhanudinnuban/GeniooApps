/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-unused-state */
/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
/* eslint-disable eqeqeq */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
import React from "react";
import { RefreshControl } from "react-native";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemeProvider } from "react-native-elements";
import { FastImage } from "react-native-fast-image";
import { TextInput } from "react-native-gesture-handler";
import { SliderBox } from "react-native-image-slider-box";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { connect } from "react-redux";
import colors from "../config/colors";
import CartScreen from "../komponen/Cart.component";
import ListProduct from "../komponen/listProductComponent";
import NotifScreen from "../komponen/Notif.component";
// eslint-disable-next-line import/no-named-as-default-member
import { styles } from "../styles/HomeScreenStyles";
import LogoHeader from "./logoHeader";

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
      refreshing: false
    };
    this.arrayholder = [];
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

  static navigationOptions = () => ({
    header: null,
  });

  addItemToCart(Qty) {
    // console.log("ProdukDetail bef QTY:" + JSON.stringify(this.state.produkDetail) + "\n")

    const itemDetail = this.state.produkDetail;
    const newItemDetail = { ...itemDetail, qty: Qty };
    // console.log("ProdukDetail aft QTY:" + JSON.stringify(newItemDetail)+ "\n")
    this.props.addToCart(newItemDetail);
    this.props.navigation.navigate("Cart");
  }

  onScreenFocus = () => {
    // Screen was focused, our on focus logic goes here
    this.myRef.current.scrollTo(0, 0);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      tapOnTabNavigator: this.onScreenFocus
    })

    // eslint-disable-next-line no-undef
    return fetch("https://genio.co.id/geniooapi/api/product/")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          function () {
            this.arrayholder = responseJson;
          }
        );
        console.log("ini array ", this.arrayholder);
      })
      .catch(error => {
        console.error(error);
      });
  }

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

  render() {
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
            placeholder="Cari Order Histori"
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
              />
            }
          >
            <View style={styles.container}>
              <FlatList
                style={styles.productsGridContainer}
                data={this.state.dataSource}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                  <View style={{
                    flexDirection: "row", margin: 10, borderRadius: 10, backgroundColor: "white",
                    elevation: 8, flex: 1
                  }}>
                    <Image
                      source={{ uri: item.photomainpath }}
                      style={{
                        marginHorizontal: 5,
                        marginVertical: 7,
                        width: 115,
                        height: 115,
                        borderRadius: 5,
                      }}
                    />
                    <View style={{ flexDirection: "column", margin: 10, flex: 1 }}>
                      <View style={{ flexDirection: "row", flex: 1 }}>
                        <Text style={{ color: colors.black, fontWeight: "bold", flex: 1 }}>{item.name}</Text>
                        <Text style={{ color: "green", textAlign: "right", flex: 1 }}>Berhasil</Text>
                      </View>
                      <Text style={{ color: colors.gray }}>{item.descriptionshort}</Text>
                      <Text style={{ color: colors.gray }}>Rp.{item.sellprice}</Text>
                      <Text style={{ color: colors.primary, fontWeight: "bold", textAlign: "right" }}>Rp.{item.sellprice}</Text>
                      <Text style={{ color: colors.gray, textAlign: "right" }}>Jumlah : 1</Text>
                    </View>
                  </View>
                }
                ListEmptyComponent={this.ListEmpty}
              />
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ThemeProvider>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addId: alat => dispatch({ type: "FETCH_PRODUCTS", payload: alat }),
  };
}

export const { width, height } = Dimensions.get("window");

export default connect(mapDispatchToProps, null)(HomeScreen);
