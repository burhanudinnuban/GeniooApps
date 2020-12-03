import React from "react";
import { Button, ThemeProvider } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { StyleSheet, View, Text, FlatList } from "react-native";

const theme = {
  colors: {
    primary: "#000",
  },
};

export default class ProductInformationScreen extends React.Component {
  constructor(props) {
    super(props);

    //this.state.id = {produkDetail};
  }

  componentDidMount() {
    return fetch("https://genio.co.id/geniooapi/api/product/detail")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            dataSource: responseJson,
            produkDetail: "",
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
    title: "Information",
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
    if (this.state.dataSource && this.state.dataSource.length) {
      this.state.produkDetail = this.state.dataSource[0];
      console.log(
        "\n produkDetail: " + JSON.stringify(this.state.produkDetail)
      );
    }
    return (
      <ThemeProvider theme={theme}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.container}>
            <Text style={styles.heading}>More About Product</Text>
            <FlatList
              style={styles.paragraph}
              data={this.state.produkDetail}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <View style={styles.dot} />
                  <Text style={styles.paragraph}>
                    {this.state.produkDetail.descriptionfull}
                  </Text>
                </View>
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
  heading: {
    fontFamily: "work-sans-bold",
    fontSize: 21,
    marginTop: 30,
  },
  paragraph: {
    fontFamily: "work-sans",
    fontSize: 14,
    marginTop: 30,
    lineHeight: 23,
  },
  listItem: {
    fontFamily: "work-sans",
    fontSize: 14,
    lineHeight: 23,
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: "#000",
    marginRight: 12,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
