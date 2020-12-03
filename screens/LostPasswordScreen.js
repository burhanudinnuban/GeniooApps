import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { Button, ThemeProvider, Input, Image } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const theme = {
  colors: {
    primary: "#000",
  },
};

export default class LostPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fastShippingChecked: false,
      UserEmail: "",
      emailValidate: true,
    };
  }

  validText(data, type) {
    // ini javascript buat email "abc@mail.com"
    const alph = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // ini javascript buat phone // << max 10-13 , yg diganti yg {5,8} ==> {min, max}
    const num = /^[\+]?[(]?[0-9]{2}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5,8}$/;

    const { UserPassword } = this.state;

    if (type == "email") {
      if (alph.test(data)) {
        // Alert.alert('yeay')
        this.setState({
          emailValidate: true,
          UserEmail: data.trim(),
          Messange: "",
        });
        return false;
      }
      // Alert.alert('incorrenct')
      this.setState({
        emailValidate: false,
        Messange: "Please enter a valid email address",
      });
      return true;
    }
  }

  // ini validasi kalau ada baris yg kosong
  validate = () => {
    const { UserEmail } = this.state;
    if (UserEmail == "") {
      alert("Please fill your email")
      return false
    }
    return true;
  };

  lostPassword_Function = () => {
    const { UserEmail } = this.state;
    this.setState({ loading: true });

    if (this.validate()) {
      return fetch(
        "https://genio.co.id/geniooapi/api/authentication/buyer/Register/lostPassword",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // ini parameternya
            user: UserEmail,
          }),
        }
      )
        .then((response) => response.json()) // response.text())
        .then((responseJson) => {
          Alert.alert(responseJson);
        });
    }
  };

  static navigationOptions = ({ navigation }) => ({
    header: null,
  });

  render() {
    return (
      <ThemeProvider theme={theme}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <View>
            <Image
              style={styles.logo}
              source={{ uri: "https:/genio.co.id/genioo/asset/logo/logo-genio-apps.png" }}
            />
          </View>
          <View style={styles.inputsContainer}>
            <Input
              containerStyle={styles.inputContainerGlobal}
              placeholder="yourmail@mail.com"
              // onChangeText={data => this.setState({ UserEmail: data.trim() })}
              onChangeText={(data) => this.validText(data, "email")}
              label="E-mail"
              labelStyle={styles.inputLabelStyle}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputInsideStyle}
              placeholderTextColor="black"
            />

            <Button
              buttonStyle={styles.saveButton}
              titleStyle={styles.titleButtonStyle}
              title="UBAH PASSWORD"
              containerStyle={styles.saveButtonContainer}
              onPress={this.lostPassword_Function}

            />


          </View>

          <View style={styles.linkContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
              <Text style={styles.linkText}>Masuk</Text>
            </TouchableOpacity>
            <View style={styles.verticalLine} />
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Registrasi")}>
              <Text style={styles.linkText}>Daftar</Text>
            </TouchableOpacity>
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
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    alignItems: "center",
    borderRadius: 20,
  },
  contentContainer: {
    backgroundColor: "#00CED1",
  },
  logo: {
    height: 147,
    width: 319,
  },
  inputContainerGlobal: {
    flexDirection: "row",
    paddingHorizontal: 0,
    alignItems: "center",
    paddingVertical: 16,
    margin: 5,
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },
  inputLabelStyle: {
    flex: 24,
    fontFamily: "Roboto",
    fontSize: 12,
    color: "black",
    marginLeft: 15,
  },
  inputContainerStyle: {
    flex: 76,
    borderBottomWidth: 0,
    borderLeftColor: "#000000",
    borderLeftWidth: 1,
    height: 21,
    paddingLeft: 10,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  addressButtonContainer: {
    flex: 76,
    borderBottomColor: "#000000",
    borderBottomWidth: 0,
    borderLeftColor: "#000000",
    borderLeftWidth: 1,
    borderRadius: 0,
    paddingLeft: 24,
    justifyContent: "center",
  },
  inputInsideStyle: {
    fontFamily: "Roboto",
    fontSize: 12,
  },
  inputsContainer: {
    backgroundColor: "#EEF2F7",
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginTop: 50,
    marginBottom: 50,
    borderRadius: 20,
  },
  checkBoxContainer: {
    borderWidth: 0,
    backgroundColor: "#EEF2F7",
    padding: 0,
    marginTop: 32,
    marginBottom: 32,
    marginRight: 0,
    marginLeft: 0,
  },
  notificationText: {
    textAlign: "justify",
  },
  checkBoxIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    marginLeft: 5,
    backgroundColor: "#00CED1",
    borderColor: "#000000",
  },
  saveButton: {
    justifyContent: "space-around",
    borderRadius: 0,
    height: 45,
    marginTop: 20,
    marginBottom: 16,
    backgroundColor: "#00CED1",
    borderRadius: 10,
  },
  titleButtonStyle: {
    fontFamily: "Roboto",
    fontSize: 18,
    flex: 1,
    textTransform: "uppercase",
  },
  linkContainer: {
    flexDirection: "row",
  },
  linkText: {
    fontFamily: "Roboto",
    fontSize: 12,
    color: 'black'
  },
  verticalLine: {
    borderLeftWidth: 1,
    borderRightColor: "#000",
    marginHorizontal: 16,
  },
  emptyBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "white",
    marginLeft: 5,
  },
});