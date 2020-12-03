import React from "react";
import { Badge, Button, ThemeProvider } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";

const theme = {
  colors: {
    primary: "#000",
  },
};

const ordersData = [
  {
    id: "3223",
    date: "02 may 2019",
    sum: "3222",
    status: "pending",
    statusColor: "#D8D8D8",
  },
  {
    id: "3523",
    date: "02 may 2019",
    sum: "3242",
    status: "success",
    statusColor: "#61ED7B",
  },
  {
    id: "3213",
    date: "02 may 2019",
    sum: "3222",
    status: "failed",
    statusColor: "#F05829",
  },
];

export default class OrdersScreen extends React.Component {
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
    title: "Orders",
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
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <View style={styles.itemId}>
                <Text style={styles.itemText}>id</Text>
              </View>
              <View style={styles.itemDate}>
                <Text style={styles.itemText}>date</Text>
              </View>
              <View style={styles.itemSum}>
                <Text style={styles.itemText}>Sum</Text>
              </View>
              <View style={styles.itemStatus}>
                <Text style={styles.itemText}>Status</Text>
              </View>
            </View>
            <FlatList
              keyExtractor={(item, index) => item.id}
              data={ordersData}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.itemsRow}
                  onPress={() => this.props.navigation.navigate("Order")}
                >
                  <View style={styles.itemId}>
                    <Text style={styles.itemText}>{item.id}</Text>
                  </View>
                  <View style={styles.itemDate}>
                    <Text style={styles.itemText}>{item.date}</Text>
                  </View>
                  <View style={styles.itemSum}>
                    <Text style={styles.itemText}>{item.sum}</Text>
                  </View>
                  <View style={[styles.itemStatus]}>
                    <Badge
                      badgeStyle={[{ backgroundColor: item.statusColor }, styles.badgeStyle]}
                      textStyle={styles.textBadgeStyle}
                      value={item.status}
                    />
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  itemsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    alignItems: "center",
  },
  itemId: {
    flex: 52,
    borderRightWidth: 1,
  },
  itemDate: {
    flex: 117,
    borderRightWidth: 1,
  },
  itemSum: {
    flex: 67,
    borderRightWidth: 1,
  },
  itemStatus: {
    flex: 91,
  },
  itemText: {
    textAlign: "center",
    fontFamily: "work-sans",
    fontSize: 14,
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
});
