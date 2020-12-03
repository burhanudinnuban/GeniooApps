import React from "react";
import { Button, AirbnbRating, ThemeProvider, Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { StyleSheet, View } from "react-native";

const theme = {
  colors: {
    primary: "#000",
  },
};

export default class WriteReviewScreen extends React.Component {
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
    },
    title: "Write a Review",
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
    headerRight: (
      <Button
        containerStyle={{
          marginLeft: 0,
        }}
        titleStyle={{
          fontFamily: "work-sans-semibold",
          fontSize: 14,
          color: "#F05829",
        }}
        buttonStyle={{
          paddingVertical: 10,
          paddingRight: 20,
        }}
        type="clear"
        onPress={() => navigation.goBack()}
        title="SEND"
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
            <View style={styles.ratingContainer}>
              <AirbnbRating
                style={{ paddingVertical: 10 }}
                count={5}
                reviews={["Terrible", "Bad", "OK", "Good", "Fine"]}
                defaultRating={0}
                size={20}
              />
            </View>

            <View style={styles.inputContainer}>
              <Input
                containerStyle={styles.inputContainerGlobal}
                placeholder="Review (Optional)"
                labelStyle={styles.inputLabelStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                placeholderTextColor="#ccc"
                multiline
              />
            </View>
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
  saveButton: {
    marginTop: 24,
    justifyContent: "space-around",
    borderRadius: 0,
    height: 55,
    marginBottom: 32,
  },
  titleButtonStyle: {
    fontFamily: "work-sans-bold",
    fontSize: 14,
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    textTransform: "uppercase",
  },
  inputContainerGlobal: {
    flexDirection: "row",
    paddingHorizontal: 0,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#000",
    paddingVertical: 16,
  },
  inputLabelStyle: {
    fontFamily: "work-sans",
    fontSize: 12,
    flexWrap: "wrap",
    flexDirection: "row",
    color: "#CCCCCC",
  },
  inputContainerStyle: {
    borderBottomColor: "#000000",
    borderBottomWidth: 0,
    borderLeftColor: "#000000",
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  ratingContainer: {
    paddingBottom: 20,
  },
  inputStyle: {
    color: "#000",
  },
});
