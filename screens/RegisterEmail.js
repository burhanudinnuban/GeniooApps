import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AlertHelper } from './AlertHelper';
import { Button, Image, Input, ThemeProvider } from "react-native-elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as profileActions from "../redux/actions/profileActions";
import * as cartActions from "../redux/actions/cartActions";
import * as productAction from "../redux/actions/productAction";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { styles } from "../styles/RegisterScreenStyles";

const theme = {
  colors: {
    primary: "#000",
  },
};

class RegisterEmailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fastShippingChecked: false,
      UserEmail: "",
      UserAkun: this.props.navigation.state.params.user,
      UserNama: "",
      UserFoto: "",
      UserPhone: "",
      UserPassword: "",
      Tipe: this.props.navigation.state.params.tipe,
      ConfirmPassword: "",
      emailValidate: true,
      phoneValidate: true,
      passwordValidate: true,
      Messange: "",
    };
  }

  // validasi isi Email dan phone
  validText(data, type) {
    // ini javascript buat email "abc@mail.com"
    const alph = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // ini javascript buat phone // << max 10-13 , yg diganti yg {5,8} ==> {min, max}
    const num = /^[\+]?[(]?[0-9]{2}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5,8}$/;

    const { UserPassword } = this.state;
    
    if (type == "user") {
      if (alph.test(data)) {
        // Alert.alert('yeay')
        this.setState({
          emailValidate: true,
          phoneValidate: true,
          UserAkun: data.trim(),
          Tipe: "email",
          Messange: "",
        });
        return false;
      }
      else if (num.test(data)) {
        this.setState({
          emailValidate: true,
          phoneValidate: true,
          UserAkun: data.trim(),
          Tipe: "phone",
          Messange: "",
        });
        return false;
      }
      // Alert.alert('incorrenct')
      this.setState({
        emailValidate: false,
        phoneValidate: false,
        Messange: "Masukkan email atau nomor ponsel yang benar",
      });
      return true;
    }

    if (type == "password") {
      // maksimal password >= 2 index alias 3 huruf [0, 1, 2]
      if (UserPassword.length >= 2) {
        this.setState({
          passwordValidate: true,
          UserPassword: data.trim(),
          Messange: "",
        });
        return false;
      }
      this.setState({
        passwordValidate: false,
        UserPassword: data.trim(),
        Messange: "Your password must be at least 3 characters",
      });
      return true;
    }
  }

  // ini validasi kalau ada baris yg kosong
  validate = () => {
    const { UserNama,  UserPassword,} = this.state;
    
    if (UserNama == "") {
      alert("Please fill your account");
      return false;
    }
    if (UserPassword == "") {
      alert("Please fill your password");
      return false;
    }
    
    return true;
  };

  async componentDidMount() {
    
  }

  registration_Function = () => {
    const { UserAkun, UserNama, Tipe, UserPassword } = this.state;
    this.setState({ loading: true });

    if (this.validate()) {
      return fetch(
        "https://genio.co.id/geniooapi/api/authentication/buyer/Register",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // ini parameternya
            user: UserAkun,
            tipe_user: Tipe,
            nama : UserNama,
            password: UserPassword,
          }),
        }
      )
        .then((response) => response.json()) // response.text())
        .then((responseJson) => {
          this.setState(
            {
              isLoading: false,
              dataSource: responseJson,
              infoUser: "",
            },
            () => {
              this.state.infoUser = this.state.dataSource[0];
              console.log(JSON.stringify(this.state.infoUser));
              if (this.state.infoUser.email !== undefined) {
                AsyncStorage.setItem("Email", responseJson[0].email);
                AsyncStorage.setItem("id_konsumen", responseJson[0].id_user);
                // AsyncStorage.setItem('password', response.password);
                AsyncStorage.setItem("isLoggedIn", "1");
                Alert.alert(responseJson[0].email, "Login Success");
                if (this.props.cartItems.length > 0) {
                  this.props.actions.mergeCartData(this.props.cartItems);
                }

                if (this.props.FromCart == 1) {
                    this.props.navigation.navigate("FormDataPengiriman",
                    { onGoBack: () => this.props.navigation.navigate("Cart") })
                    this.props.actionsProfile.loginFromCart(0)
                }
                else {
                    this.props.navigation.navigate("Main");
                }
              }
              else {
                AlertHelper.show('error', 'Error', responseJson)
              }
            }
          );
        });
    }
  };

  static navigationOptions = ({ navigation }) => ({
    title: "Daftar dengan E-mail",
    headerTitleStyle: {
      textAlign: "center",
    },
  });

  render() {
    return (
      <ThemeProvider theme={theme}>
        <SafeAreaView style={styles.Back}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
          >
            <View>
              <Image
                style={styles.logo}
                source={{
                  uri:
                    "https:/genio.co.id/genioo/asset/logo/logo-genio-apps.png",
                }}
              />
            </View>
            <View style={styles.inputsContainer}>
              <Input
                containerStyle={styles.inputContainerGlobal}
                placeholder={this.state.UserAkun}
                // onChangeText={data => this.setState({ UserEmail: data.trim() })}
                onChangeText={(data) => this.validText(data, "user")}
                label="Email"
                labelStyle={styles.inputLabelStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputInsideStyle}
                placeholderTextColor="black"
                editable={false}
              />
              <Input
                containerStyle={styles.inputContainerGlobal}
                placeholder="Nama Lengkap"
                label="Nama"
                labelStyle={styles.inputLabelStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputInsideStyle}
                onChangeText={nama => this.setState({ UserNama: nama })}
                value={this.state.UserNama}
                placeholderTextColor="black"
              />
              <Input
                containerStyle={styles.inputContainerGlobal}
                placeholder="**********"
                // onChangeText={data => this.setState({ UserPassword: data })}
                onChangeText={(data) => this.validText(data, "password")}
                label="Password"
                labelStyle={styles.inputLabelStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputInsideStyle}
                placeholderTextColor="black"
                secureTextEntry
              />

              <Button
                buttonStyle={styles.saveButton}
                titleStyle={styles.titleButtonStyle}
                title="DAFTAR"
                containerStyle={styles.saveButtonContainer}
                onPress={this.registration_Function}
              // onPress={() => this.props.navigation.navigate("Home")}
              />

            </View>
            
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ThemeProvider>
    );
  }
}
const mapStateToProps = state => ({
  cartItems: state.cart.cart,
  FromCart: state.profile.loginFromCart
});
const ActionCreatorsProfile = Object.assign({}, profileActions);
const ActionCreators = Object.assign({}, cartActions);
const ProductCreators = Object.assign({}, productAction);

const mapDispatchToProps = dispatch => ({
  actionsProfile: bindActionCreators(ActionCreatorsProfile, dispatch),
  actions: bindActionCreators(ActionCreators, dispatch),
  produk: bindActionCreators(ProductCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterEmailScreen);