import React from "react";
import { Button, Image, ThemeProvider } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { StyleSheet, View, Text, FlatList, Dimensions, TouchableOpacity } from "react-native";

const theme = {
  colors: {
    primary: "#000",
  },
};

const productsData = [
  {
    key: "1",
    title: "Sweatshirt with Gucci basquiat print",
    picture: "https://wondermedia.ru/wp-content/uploads/2017/12/LAW-YELLOW-BACK-800x1200.jpg",
    price: "$ 32",
    oldprice: "$ 64",
  },
  {
    key: "2",
    title: "Sweatshirt with Barber basquiat print 2",
    picture: "https://wondermedia.ru/wp-content/uploads/2017/12/8303969428_2_1_1.jpg",
    price: "$ 32",
    oldprice: "$ 64",
  },
  {
    key: "3",
    title: "Sweatshirt with Lacoste basquiat print 3",
    picture: "https://wondermedia.ru/wp-content/uploads/2017/12/5408231050_2_5_1.jpg",
    price: "$ 32",
    oldprice: "$ 64",
  },
  {
    key: "4",
    title: "Sweatshirt with Versace print 4",
    picture: "https://wondermedia.ru/wp-content/uploads/2017/12/5810229305_1_1_1.jpg",
    price: "$ 32",
    oldprice: "$ 64",
  },
];

export default class DiscountProductsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fastShippingChecked: false,
      freeShippingChecked: true,
      applePayChecked: true,
      visaChecked: false,
      stripeChecked: false,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#fff",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      marginHorizontal: 24,
      elevation: 0,
    },
    title: "Sales",
    headerTitleStyle: {
      fontFamily: "work-sans-semibold",
      fontSize: 18,
      textAlign: "center",
      flex: 1,
    },
    headerLeft: (
      <Button
        containerStyle={{
          marginLeft: 0,
        }}
        buttonStyle={{
          paddingVertical: 10,
          paddingRight: 20,
        }}
        type="clear"
        onPress={() => navigation.goBack()}
        icon={<Ionicons name="ios-arrow-back" size={20} color="#000" />}
      />
    ),
  });

  render() {
    return (
      <ThemeProvider theme={theme}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.container}>
            <Text style={styles.countProductsText}>21 312 product found</Text>
            <FlatList
              style={styles.productsGridContainer}
              data={productsData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.productGridItem}
                  onPress={() => this.props.navigation.navigate("Product")}
                >
                  <Image style={styles.imageProductGridItem} source={{ uri: item.picture }} />
                  <Button
                    buttonStyle={styles.saveButton}
                    titleStyle={styles.titleButtonStyle}
                    title="ADD TO CART"
                    icon={
                      <View style={styles.appleLogoButtonContainer}>
                        <Text style={styles.priceInsideButtonText}>$ 31</Text>
                      </View>
                    }
                    iconRight
                    containerStyle={styles.saveButtonContainer}
                  />
                  <View style={[styles.titleProductGridItemContainer]}>
                    <Text style={[styles.titleProductGridItem]}>{item.title}</Text>
                  </View>
                  <View style={styles.priceRowRelated}>
                    <Text style={styles.actualPriceRelated}>{item.price}</Text>
                    <Text style={styles.oldPriceRelated}>{item.oldprice}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </KeyboardAwareScrollView>
      </ThemeProvider>
    );
  }
}

export const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  headerBackButton: {
    marginLeft: 24,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
  },
  contentContainer: {},
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#000",
  },
  sortingContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  sortingButtonContainer: {
    padding: 0,
  },
  popularityButtonContainer: {},
  verticalLine: {
    borderLeftWidth: 1,
    borderRightColor: "#000",
  },
  sortingButton: {
    padding: 0,
  },
  sortingButtonTitle: {
    color: "#000",
    fontFamily: "work-sans",
    fontSize: 14,
  },
  activeSortingButtonTitle: {
    fontFamily: "work-sans-bold",
  },
  sortingPriceButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sortingButtonIcon: {
    marginRight: 16,
  },
  countProductsText: {
    marginVertical: 16,
    textAlign: "center",
    color: "#000",
    fontFamily: "work-sans-semibold",
    fontSize: 10,
  },
  productsGridContainer: {
    marginHorizontal: -8,
    flexDirection: "column",
  },
  productGridItem: {
    flex: 0.5,
    marginHorizontal: 8,
    marginBottom: 24,
  },
  imageProductGridItem: {
    width: "100%",
    height: height * 0.5,
  },
  priceRowRelated: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  actualPriceRelated: {
    fontFamily: "work-sans-bold",
    fontSize: 21,
    color: "#F05829",
    marginRight: 8,
  },
  oldPriceRelated: {
    fontFamily: "work-sans-bold",
    fontSize: 14,
    color: "#646464",
    textDecorationLine: "line-through",
  },
  titleProductGridItemContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  titleProductGridItem: {
    maxWidth: 240,
    fontFamily: "work-sans",
    fontSize: 18,
    textAlign: "center",
  },
  titleButtonStyle: {
    fontFamily: "work-sans-bold",
    fontSize: 18,
    flex: 2,
    paddingBottom: 0,
    paddingTop: 0,
  },
  appleLogoButtonContainer: {
    borderLeftWidth: 1,
    borderLeftColor: "#fff",
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
  priceInsideButtonText: {
    fontFamily: "work-sans-bold",
    fontSize: 18,
    color: "#fff",
  },
  saveButton: {
    justifyContent: "space-around",
    borderRadius: 0,
    height: 55,
    marginVertical: 20,
  },
});
