import React from "react";
import { Button, Image, ThemeProvider } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const theme = {
  colors: {
    primary: "#000",
  },
};

const categoriesArray = [
  {
    picture:
      "https://wondermedia.ru/wp-content/uploads/2017/12/LAW-YELLOW-BACK-800x1200.jpg",
    title: "Hoodies",
    count: "21 312",
    discount: false,
  },
  {
    picture:
      "https://wondermedia.ru/wp-content/uploads/2017/12/8303969428_2_1_1.jpg",
    title: "Jeans",
    count: "11 112",
    discount: false,
  },
  {
    picture:
      "https://wondermedia.ru/wp-content/uploads/2017/12/5408231050_2_5_1.jpg",
    title: "Shoes",
    count: "45 000",
    discount: true,
  },
  {
    picture:
      "https://wondermedia.ru/wp-content/uploads/2017/12/5810229305_1_1_1.jpg",
    title: "Swimsuits",
    count: "11 112",
    discount: false,
  },
  {
    picture:
      "https://wondermedia.ru/wp-content/uploads/2017/12/6932456251_1_1_1.jpg",
    title: "Dresses",
    count: "11 112",
    discount: false,
  },
];

export default class ParentCategoriesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 0,
      isLoading: true,
    };
  }

  componentDidMount() {
    return fetch("https://genio.co.id/geniooapi/api/product/")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          function() {}
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#fff",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      marginHorizontal: 24,
      elevation: 0,
    },
    title: "Alat Sembahyang",
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
        onPress={() => {
          navigation.goBack();
        }}
        icon={<Ionicons name="ios-arrow-back" size={20} color="#000" />}
      />
    ),
  });

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
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.container}>
            <FlatList
              data={this.state.dataSource}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.categoryItemContainer}
                  onPress={() =>
                    this.props.navigation.navigate("ChildCategories")
                  }>
                  <View style={styles.imageCategoryContainer}>
                    <Image
                      style={styles.imageCategoryItem}
                      source={{ uri: item.photomainpath }}
                    />
                  </View>
                  <View style={styles.infoCategoryItemContainer}>
                    <View>
                      <Text style={styles.titleCategoryTextStyle}>
                        {item.categoryname}
                      </Text>
                    </View>
                    <View style={styles.countContainer}>
                      <Ionicons
                        name="ios-arrow-round-forward"
                        size={16}
                        color="#000"
                      />
                    </View>
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

const styles = StyleSheet.create({
  headerBackButton: {
    marginLeft: 24,
  },
  container: {
    paddingHorizontal: 24,
  },
  imageCategoryContainer: {
    flex: 90,
    marginRight: 24,
  },
  imageCategoryItem: {
    height: 130,
  },
  infoCategoryItemContainer: {
    flex: 240,
    justifyContent: "center",
  },
  categoryItemContainer: {
    flexDirection: "row",
    marginVertical: 24,
  },
  countContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  titleCategoryTextStyle: {
    fontFamily: "work-sans-semibold",
    fontSize: 22,
  },
  countTextStyle: {
    fontFamily: "work-sans-semibold",
    fontSize: 10,
  },
  discountContainer: {
    position: "absolute",
    bottom: 1,
    backgroundColor: "#F05829",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  discountTextStyle: {
    color: "#fff",
    fontFamily: "work-sans",
    fontSize: 10,
  },
});
