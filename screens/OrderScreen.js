import React from "react";
import { Badge, Button, ThemeProvider } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { StyleSheet, View, Text, FlatList } from "react-native";

const theme = {
  colors: {
    primary: "#000",
  },
};

const ordersData = [
  {
    id: "1",
    title: "Sweatshirt with Gucci basquiat print",
    price: "6,66",
  },
  {
    id: "2",
    title: "Sweatshirt with Gucci basquiat print",
    price: "6,66",
  },
  {
    id: "3",
    title: "Sweatshirt with Gucci basquiat print",
    price: "6,66",
  },
];

export default class OrderScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#fff",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      marginHorizontal: 24,
      elevation: 0,
    },
    title: "Order #3223 from 02 May 2019",
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
    return (
      <ThemeProvider theme={theme}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.container}>
            <View style={styles.sortingContainer}>
              <Button
                title="Orders"
                type="clear"
                containerStyle={[
                  styles.sortingButtonContainer,
                  styles.sortingPriceButtonContainer,
                ]}
                buttonStyle={[styles.sortingButton]}
                titleStyle={styles.sortingButtonTitle}
                onPress={() => this.props.navigation.navigate("Orders")}
              />
              <View style={styles.verticalLine} />
              <Button
                title="Account Details"
                type="clear"
                containerStyle={[
                  styles.popularityButtonContainer,
                  styles.sortingButtonContainer,
                ]}
                buttonStyle={styles.sortingButton}
                titleStyle={[
                  styles.sortingButtonTitle,
                  styles.activeSortingButtonTitle,
                ]}
                onPress={() => this.props.navigation.navigate("Profile")}
              />
              <View style={styles.verticalLine} />
              <Button
                title="Logout"
                type="clear"
                containerStyle={styles.showAllButtonContainer}
                buttonStyle={styles.sortingButton}
                titleStyle={styles.sortingButtonTitle}
                onPress={() => this.props.navigation.navigate("Auth")}
              />
            </View>
            <View style={styles.orderDetailsRow}>
              <Text style={styles.sortingButtonTitle}>Order Details</Text>
              <Badge
                badgeStyle={[{ backgroundColor: "#61ED7B" }, styles.badgeStyle]}
                textStyle={styles.textBadgeStyle}
                value="Success"
              />
            </View>
            <FlatList
              style={styles.ordersContainer}
              keyExtractor={(item, index) => item.id}
              data={ordersData}
              renderItem={({ item }) => (
                <View style={styles.itemsRow}>
                  <Text style={styles.orderText}>{item.title}</Text>
                  <Text style={styles.sortingButtonTitle}>+$ {item.price}</Text>
                </View>
              )}
            />
            <View style={styles.orderDetailsRow}>
              <Text style={styles.sortingButtonTitle}>Payment Details</Text>
            </View>
            <View style={styles.ordersContainer}>
              <View style={styles.itemsRow}>
                <Text style={styles.orderText}>Sub-total</Text>
                <Text style={styles.sortingButtonTitle}>+$ 6,66</Text>
              </View>
              <View style={styles.itemsRow}>
                <Text style={styles.orderTextBold}>Total to pay</Text>
                <Text style={styles.sortingButtonTitleBold}>+$ 213,666</Text>
              </View>
              <View style={styles.itemsRow}>
                <Text style={styles.orderText}>Payment method:</Text>
                <Text style={styles.sortingButtonTitle}>Stripe</Text>
              </View>
            </View>
            <View style={styles.orderDetailsRow}>
              <Text style={styles.sortingButtonTitle}>Billing Details</Text>
            </View>
            <View style={styles.ordersContainer}>
              <View style={styles.itemsRow}>
                <Text style={styles.orderText}>Noel Galagher</Text>
              </View>
              <View style={styles.itemsRow}>
                <Text style={styles.orderTextBold}>gascoigne@gmail.com</Text>
              </View>
              <View style={styles.itemsRow}>
                <Text style={styles.addressBadge}>
                  48 Lexington St, Soho, London
                </Text>
              </View>
            </View>
            <Button
              buttonStyle={styles.saveButton}
              titleStyle={styles.titleButtonStyle}
              title="REORDER AGAIN"
              containerStyle={styles.saveButtonContainer}
              onPress={() => this.props.navigation.navigate("Checkout")}
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
  orderDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  badgeStyle: {
    borderRadius: 8,
    paddingHorizontal: 6,
  },
  textBadgeStyle: {
    fontFamily: "work-sans",
    fontSize: 10,
    color: "#000",
  },
  itemsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    alignItems: "center",
  },
  orderText: {
    color: "#000",
    fontFamily: "work-sans",
    fontSize: 12,
  },
  orderTextBold: {
    color: "#000",
    fontFamily: "work-sans-bold",
    fontSize: 12,
  },
  sortingButtonTitleBold: {
    color: "#000",
    fontFamily: "work-sans-bold",
    fontSize: 14,
  },
  ordersContainer: {
    paddingVertical: 24,
  },
  addressBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#000",
    marginRight: 16,
    marginBottom: 32,
    fontFamily: "work-sans-bold",
    fontSize: 12,
  },
  saveButton: {
    marginTop: 0,
    justifyContent: "space-around",
    borderRadius: 0,
    height: 55,
    marginBottom: 32,
  },
  titleButtonStyle: {
    fontFamily: "work-sans-bold",
    fontSize: 18,
    flex: 1,
    textTransform: "uppercase",
  },
});
