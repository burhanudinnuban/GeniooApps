import React from "react";
import { Button, ThemeProvider, Image } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { StyleSheet, View, StatusBar, Text } from "react-native";

const theme = {
  colors: {
    primary: "#000",
  },
};

export default class SuccessReviewScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.container}>
            <Image
              style={styles.imageThanx}
              source={{
                uri: "https://wondermedia.ru/wp-content/uploads/2017/12/Group.png",
              }}
            />
            <View style={styles.thanxHeaderContainer}>
              <Text style={styles.thanxHeader}>Thank you for Review</Text>
            </View>
            <View style={styles.thanxTextContainer}>
              <Text style={styles.thanxText}>Your review will be published by our moderator.</Text>
            </View>
            <Button
              buttonStyle={styles.saveButton}
              titleStyle={styles.titleButtonStyle}
              title="GO BACK"
              containerStyle={styles.saveButtonContainer}
              onPress={() => this.props.navigation.goBack()}
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
    backgroundColor: "#212792",
    paddingHorizontal: 24,
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  contentContainer: {
    backgroundColor: "#212792",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 24,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#000",
  },
  imageThanx: {
    marginTop: 110,
    height: 155,
    width: 220,
  },
  thanxHeader: {
    fontFamily: "work-sans",
    fontSize: 38,
    textTransform: "uppercase",
    color: "#fff",
    textAlign: "center",
  },
  thanxText: {
    fontFamily: "work-sans",
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  thanxHeaderContainer: {
    marginVertical: 48,
  },
  thanxTextContainer: {
    marginBottom: 48,
  },
  titleButtonStyle: {
    fontFamily: "work-sans",
    fontSize: 18,
    textTransform: "uppercase",
    color: "#000",
  },
  saveButton: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 0,
    height: 55,
    backgroundColor: "#fff",
    width: "100%",
    marginHorizontal: 0,
    justifyContent: "space-around",
  },
  saveButtonContainer: {
    height: 55,
    paddingHorizontal: 24,
  },
});
