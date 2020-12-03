import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
//import { ThemeProvider } from "react-native-elements";
import { connect } from 'react-redux';
import Product from '../components/Product.component';
import { addToCart } from '../redux/actions/cartActions';
import { fetchProducts } from '../redux/actions/productAction';
import Cart from '../components/Cart.component';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";


const theme = {
  colors: {
    primary: "#000",
  },
};

class Products extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: () => <Cart navigation={navigation} />,
    headerStyle: {
      backgroundColor: "transparent",
      borderBottomWidth: 0,
      marginHorizontal: 24,
      elevation: 0,
    },
    headerTransparent: true,
    title: "",
    headerTitleStyle: {
      fontFamily: "work-sans-semibold",
      fontSize: 18,
      textAlign: "center",
      flex: 1,
    },
    headerLeft: null,
  });


  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }
  componentDidMount = () => {
    this.props.fetchProducts();
    
  }

  addItemsToCart = (product) => {
    this.props.addToCart(product);
  }

  render() {
    const { products, navigation } = this.props
    return (
      <ThemeProvider theme={theme}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.container}>
            <View style={styles.headerBannerContainer}>
              <Text style={styles.headerTextStyle}>Product</Text>
            </View>
            <TouchableOpacity
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
                <Text style={styles.textInsideCategory}>Sarana sembahyang</Text>
              </ImageBackground>
            </TouchableOpacity>
            <View style={styles.body}>
              <FlatList
                style={styles.productsGridContainer}
                data={products}
                numColumns={2}
                renderItem={({ item }) => <Product item={item} addItemsToCart={this.addItemsToCart} product={item} />}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <View style={{ height: 0.5, backgroundColor: '#34495e90' }} />} />
            </View>
            <TouchableOpacity
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
                <Text style={styles.textInsideCategory}>Alat sembahyang</Text>
              </ImageBackground>
            </TouchableOpacity>
            <View style={styles.body}>
            <FlatList
                style={styles.productsGridContainer}
                data={products}
                numColumns={2}
                renderItem={({ item }) => <Product item={item} addItemsToCart={this.addItemsToCart} product={item} />}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <View style={{ height: 0.5, backgroundColor: '#34495e90' }} />} />
            </View>
          </View>
         
        </KeyboardAwareScrollView>
      </ThemeProvider>
    );
  }
}

export const { width, height } = Dimensions.get("window");


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
  },
  headerBannerContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 48,
  },
  backgroundContainer: {
    height: 395,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    flex: 1,
    justifyContent: 'center'
  },
  headerTextStyle: {
    fontFamily: "work-sans-bold",
    fontSize: 48,
    textAlign: "center",
    zIndex: 10,
    lineHeight: 48,
    textTransform: "uppercase",
    color: "red"
  },
  productsGridContainer: {
    marginHorizontal: -8,
    flexDirection: "column",
  },
  categoryBannerContainer: {
    marginVertical: 24,
  },
  textInsideCategory: {
    fontFamily: "work-sans",
    fontSize: 36,
    textAlign: "center",
    color: "red"
    //textTransform: "smallcase",
  },
});

const mapStateToProps = (state) => ({
  products: state.products.items
})

export default connect(mapStateToProps, { addToCart, fetchProducts })(Products);