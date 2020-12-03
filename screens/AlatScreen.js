import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  View,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from "react-native";
import { Button, ThemeProvider, Image, Input } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { connect } from "react-redux";
import { styles } from "../styles/HomeScreenStyles";
import CartHeader from "../komponen/Cart.component";
// import { SliderBox } from "react-native-image-slider-box";
import { FastImage } from "react-native-fast-image";

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
      ],
    };
    this.arrayholder = [];
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
        icon={<Icon name="arrow-alt-left" size={20} color="#000" />}
      />
    ),
    //   headerRight: <CartHeader navigation={navigation} />,
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
    title: "Alat Sembahyang",
    headerTitleStyle: {
      fontFamily: "Roboto",
      fontSize: 18,
      textAlign: "justify",
      flex: 1,
      // marginTop: 20,
      color: "red",
    },
  });

  componentDidMount() {
    return fetch("https://genio.co.id/geniooapi/api/product/alat/")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          function() {
            this.arrayholder = responseJson;
          }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  FlatListItemSeparator = () => {
    return (
      <View
      //   style={{
      //   height: 1,
      //   width: '100%',
      //   backgroundColor: '#607D8B',
      // }}
      />
    );
  };

  GetFlatListItem(name) {
    Alert.alert(name);
  }

  //function Filter, cari berdasarkan Nama Produk
  SearchFilter(Cari) {
    const newData = this.arrayholder.filter((item) => {
      const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
      const textData = Cari.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      dataSource: newData,
    });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    const sarana = [];

    return (
      <ThemeProvider theme={theme}>
        <View style={styles.search}>
          <Input
            type="Search"
            containerStyle={styles.Cari}
            inputStyle={styles.IsiCari}
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
              {/* <SliderBox
              ImageComponent={FastImage}
              images={this.state.images}
              sliderBoxHeight={200}
              onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
              dotColor="#FFEE58"
              inactiveDotColor="#90A4AE"
              paginationBoxVerticalPadding={20}
              autoplay
              circleLoop
              resizeMethod={'resize'}
              resizeMode={'cover'}
              paginationBoxStyle={{
                position: "absolute",
                bottom: 0,
                padding: 0,
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
                paddingVertical: 10
              }}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                padding: 0,
                margin: 0,
                backgroundColor: "rgba(128, 128, 128, 0.92)"
              }}
              ImageComponentStyle={{borderRadius: 5, width: '87%', marginTop: 5, marginRight: 20, marginLeft: -20}}
              imageLoadingColor="#2196F3"
            /> */}
              {/* <View>
              <Text style={{ fontSize: 20,textAlign: 'center', paddingTop: 5, paddingBottom: 5, color: '#e90003' }}>Alat Sembahyang</Text>
            </View> */}

              <View style={styles.headerBannerContainer}>
                {/* <Text style={styles.headerTextStyle}>Maturan</Text> */}
                {/* <View style={styles.discountBannerContainer}>
                <FlatList
                  data={[
                    { text: "5% Alat Sembahyang" },
                    { text: "5% Sarana Sembahyang" },
                   
                  ]}
                  numColumns={2}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <View style={styles.saleBannerTextContainer}>
                      <Text style={styles.saleBannerText}>{item.text}</Text>
                    </View>
                  )}
                />
              </View> */}
              </View>
              {/* <TouchableOpacity
              style={styles.categoryBannerContainer}
              onPress={() => this.props.navigation.navigate("ParentCategories")}
            // onPress={() => this.props.navigation.dispatch(
            //     NavigationActions.setParams({
            //         params: { name: this.setState.name + 1 },
            //         key: 'Cart',
            //       })
            // )}
            >
              <ImageBackground
                source={{
                  uri:
                    "http://maturan.co/asset/images/alat-sembahyang.png",
                }}
                style={styles.backgroundContainer}
              >
                <Text style={styles.textInsideCategory}>alat sembahyang</Text>
              </ImageBackground>
            </TouchableOpacity> */}

              {/* <FlatList
              style={styles.productsGridContainer}
              data={alat}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.productGridItem}
                  onPress={() => this.props.navigation.navigate("Product", { id: item.id})}
                >
                  <Image style={styles.imageProductGridItem} source={ { uri: item.photomainpath } } />
                  <View style={[styles.titleProductGridItemContainer]}>
                    <Text style={[styles.titleProductGridItem]}>{item.name}</Text>
                  </View>
                  <View style={styles.priceRow}>
                    <Text style={styles.actualPrice}>Rp {item.sellprice}</Text>
                    <Text style={styles.oldPrice}>Rp {item.price}</Text>
                  </View>

                </TouchableOpacity>
              )}
            /> */}
              {/* <View style={styles.CariFilter}>
              <Input type="Search" 
                containerStyle={styles.Cari}
                inputStyle={styles.IsiCari}
                className="Input" 
                placeholder="Cari Produk atau Penjual" 
                onChangeText={(Cari) => this.SearchFilter(Cari)}
              />
            </View> */}

              <View style={styles.linkContainer}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Sarana")}>
                  {/* <View style={{alignItems: 'center', }}>
                    <Icon 
                      raised
                      name='heartbeat'
                      type='font-awesome'
                      color='#f50'
                      alignItems= 'center'
                      justifyContent= 'center'            
                      onPress={() => this.props.navigation.navigate("Sarana")} 
                      />
                  </View> */}
                  <Text style={styles.linkText}>Sarana Sembahyang</Text>
                </TouchableOpacity>
                <View style={styles.blankSpace} />
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Alat")}>
                  {/* <View style={{alignItems: 'center', }}>
                    <Icon 
                      raised
                      name='sc-telegram'
                      type='evilicon'
                      color='#f50'
                      alignItems= 'center'
                      onPress={() => this.props.navigation.navigate("Alat")} />
                  </View> */}
                  <Text style={styles.linkText}>Alat Sembahyang</Text>
                </TouchableOpacity>
              </View>

              {/* <TouchableOpacity
              style={styles.categoryBannerContainer}
              onPress={() => this.props.navigation.navigate("ParentCategories")}
            >
              <ImageBackground
                source={{
                  uri:
                    "https://maturan.co/v1/asset/foto_kategori/sarana-sembahyang.png",
                }}
                style={styles.backgroundContainer}
              >
                <Text style={styles.textInsideCategory}>{`sarana sembahyang`}</Text>
              </ImageBackground>
            </TouchableOpacity> */}
              <FlatList
                ListHeaderComponent={this.FlatListItemSeparator} //
                style={styles.productsGridContainer}
                data={this.state.dataSource}
                numColumns={2}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.productGridItem}
                    onPress={() =>
                      this.props.navigation.navigate("Product", { id: item.id })
                    }>
                    <Image
                      style={styles.imageProductGridItem}
                      source={{ uri: item.photomainpath }}
                    />
                    <View style={[styles.titleProductGridItemContainer]}>
                      <Text style={[styles.titleProductGridItem]}>
                        {item.name}
                      </Text>
                    </View>
                    <View style={styles.priceRow}>
                      <Text style={styles.oldPrice}>Rp. {item.price}</Text>
                      <Text style={styles.actualPrice}>
                        Rp. {item.sellprice}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ThemeProvider>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addId: (alat) => dispatch({ type: "FETCH_PRODUCTS", payload: alat }),
  };
};

export const { width, height } = Dimensions.get("window");

export default connect(null, mapDispatchToProps)(HomeScreen);
