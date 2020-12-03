import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";
import { Button, CheckBox, Image, Input, ThemeProvider } from "react-native-elements";
import { GoogleSignin, GoogleSigninButton, statusCodes } from "react-native-google-signin";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { styles } from "../styles/LoginStyles";
import AsyncStorage from "@react-native-community/async-storage";
import * as profileActions from "../redux/actions/profileActions";
import * as cartActions from "../redux/actions/cartActions";
import * as productAction from "../redux/actions/productAction";
// import {NavigationActions} from 'react-navigation';

const theme = {
  colors: {
    primary: "#000",
  },
};

// dummy
// const userinfo ={user:'admin', pass:'123'}

class AuthScreen extends React.Component {
  // static navigationOptions = {
  //   title: "LoginActivity",
  // };

  constructor(props) {
    super(props);
    this.state = {
      fastShippingChecked: false,
      UserEmail: "",
      UserPassword: "",
      UserPhone: "",
      UserAkun: "",
      Tipe: "",
      show: false,
      Warning: "",
      isLoading: "",
      dataSource: "",
      isLoading: false,
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
          show: true,
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
          show: false,
          Tipe: "phone",
          Messange: "",
        });
        return false;
      }
      else {
        this.setState({
          emailValidate: false,
          phoneValidate: false,
          UserAkun: data.trim(),
          show: false,
          Tipe: "",
          Messange: "",
        });
        return false;
      }
      // // Alert.alert('incorrenct')
      // this.setState({
      //   emailValidate: false,
      //   phoneValidate: false,
      //   Messange: "Masukkan email atau nomor ponsel yang benar",
      // });
      return true;
    }
  }

  validate = () => {
    const { UserAkun, Tipe, UserPassword, emailValidate, phoneValidate } = this.state;
    if (UserAkun == "") {
      alert("Please fill your email/phone");
      return false;
    }
    if (Tipe == 'email') {
      if (UserAkun == "") {
        alert("Please fill your email/phone");
        return false;
      }
    }
    else {
      if (emailValidate == false && phoneValidate == false) {
        alert("Isi email atau nomor ponsel yang benar");
        return false;
      }
    }
    return true;
  };

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate("Registrasi")}>
        <Text style={styles.linkTextHeader}>Daftar</Text>
      </TouchableOpacity>
    ),
    title: "Masuk",
    headerTitleStyle: {
      textAlign: "center",
    },
  });

  loginEmail = () => {
    const { UserAkun, UserPassword } = this.state;
    this.setState({ loading: true });

    if (this.validate()) {
      return fetch("https://genio.co.id/geniooapi/api/authentication/buyer/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // ini parameternya
          user: UserAkun,
          password: UserPassword,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState(
            {
              isLoading: false,
              dataSource: responseJson,
              infoUser: "",
            },
            () => {
              this.state.infoUser = this.state.dataSource;
              console.log('Data User : ', JSON.stringify(this.state.infoUser));
              if (this.state.infoUser.email !== undefined) {
                AsyncStorage.setItem("Email", this.state.infoUser.email);
                AsyncStorage.setItem("id_konsumen", this.state.infoUser.id_user);
                this.props.produk.fetchDataProduct(this.state.infoUser.id_user);
                this.props.actions.fetchCartData(this.state.infoUser.id_user);
                this.props.actionsProfile.fetchProfileData(this.state.infoUser.id_user);
                AsyncStorage.setItem("isLoggedIn", "1");
                Alert.alert(responseJson.email, "Berhasil Masuk");
                if (this.props.cartItems.length > 0) {
                  this.props.actions.mergeCartData(this.props.cartItems);
                }
                if (this.props.FromCart == 1) {
                  this.props.navigation.navigate("Main",
                    { onGoBack: () => this.props.navigation.navigate("Home") })
                  this.props.actionsProfile.loginFromCart(0)
                }
                else {
                  this.props.navigation.navigate("Main");
                }
              } else {
                Alert.alert(responseJson);
              }
            }
          ).catch(error => {
            console.log(error);
          });
        });
    }
  };

  // try again #13
  CallAPI = () => {
    const { UserAkun, UserPassword, Tipe } = this.state;
    this.setState({ loading: true });

    if (this.validate()) {
      return fetch("https://genio.co.id/geniooapi/api/authentication/buyer/login/cek_akun", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // ini parameternya
          user: UserAkun,
          tipe_user: Tipe,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState(
            {
              isLoading: false,
              dataSource: responseJson,
              infoUser: "",
            },
            () => {
              this.state.infoUser = this.state.dataSource;
              if (Tipe == 'email') {
                if (responseJson == 1) {
                  this.loginEmail()
                }
                else {
                  Alert.alert(
                    "Email Belum Terdaftar",
                    "Lanjut daftar dengan email ini " + UserAkun + "?",
                    [
                      { text: 'Ubah', onPress: () => console.log('No button clicked'), style: 'cancel' },
                      { text: 'Ya, Daftar', onPress: () => this.props.navigation.navigate("OpsiVerifikasi", { email: UserAkun }) },
                    ],
                    {
                      cancelable: true
                    }
                  );
                }
              }
              else {
                if (responseJson == 1) {
                  this.props.navigation.navigate("OpsiVerifikasi", { phone: UserAkun, login: 1 });
                }
                else {
                  Alert.alert(
                    "Nomor Ponsel Belum Terdaftar",
                    "Lanjut daftar dengan nomor ini " + UserAkun + "?",
                    [
                      { text: 'Ubah', onPress: () => console.log('No button clicked'), style: 'cancel' },
                      { text: 'Ya, Daftar', onPress: () => this.props.navigation.navigate("OpsiVerifikasi", { phone: UserAkun }) },
                    ],
                    {
                      cancelable: true
                    }
                  );
                }

              }
            }
          ).catch(error => {
            console.log(error);
          });
        });
    }
    // else {
    //   Alert.alert('Warning', 'Username / Password Failed!');
    // }
  };

  async componentDidMount() {
    if (this.props.navigation.state.params.email !== undefined) {
      this.setState({
        UserAkun: this.props.navigation.state.params.email,
        Tipe: 'email',
        show: true,
      })
    }
  }

  _signIn = async () => {
    try {
      GoogleSignin.configure({
        webClientId: "173784429591-02vsmpk5ltc6ok3qujj3ttcile0o8dpr.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("Succsess : ", userInfo);
      return fetch(
        "https://genio.co.id/geniooapi/api/authentication/buyer/Register/registerGoogle",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // ini parameternya
            user: userInfo.user.email,
            nama_lengkap: userInfo.user.name,
            foto: userInfo.user.photo,
          }),
        }
      )
        .then(response => response.json()) // response.text())
        .then(responseJson => {
          if (responseJson[0].email !== undefined || responseJson[0].email !== "") {
            if (responseJson[0].email !== undefined) {
              this.signOut();
              AsyncStorage.setItem("Email", responseJson[0].email);
              AsyncStorage.setItem("id_konsumen", responseJson[0].id_user);
              // AsyncStorage.setItem('password', response.password);
              this.props.produk.fetchDataProduct(responseJson[0].id_user);
              this.props.actions.fetchCartData(responseJson[0].id_user);
              this.props.actionsProfile.fetchProfileData(responseJson[0].id_user);
              AsyncStorage.setItem("isLoggedIn", "1");
              Alert.alert(responseJson[0].email, "Berhasil Masuk");
              if (this.props.cartItems.length > 0) {
                this.props.actions.mergeCartData(this.props.cartItems);
              }
              if (this.props.FromCart == 1) {

                this.props.navigation.navigate("Main",
                  { onGoBack: () => this.props.navigation.navigate("Cart") })
                this.props.actionsProfile.loginFromCart(0)
              }
              else {
                this.props.navigation.navigate("Main");
              }
            } else {
              Alert.alert(responseJson);
            }
          } else {
            setTimeout(() => {
              Alert.alert("Warning", "Your Username / Password was wrong!");
            }, 100);
          }
        });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {

      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {

      } else {
        console.log(error);

      }
    }
  };

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };


  render() {
    const { Tipe, show, UserAkun } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <View>
            <Image
              style={styles.logo}
              source={{
                uri: "https:/genio.co.id/genioo/asset/logo/logo-genio-apps.png",
              }}
            />
          </View>
          <View style={styles.inputsContainer}>
            <Input
              containerStyle={styles.inputContainerGlobal}
              placeholder="Email atau Nomor Ponsel"
              // onChangeText={data => this.setState({ UserEmail: data.trim() })}
              onChangeText={(data) => this.validText(data, "user")}
              label="Akun"
              value={UserAkun}
              labelStyle={styles.inputLabelStyle}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputInsideStyle}
              placeholderTextColor="black"
            />

            {show ? (
              <Input
                containerStyle={styles.inputContainerGlobal}
                placeholder="Password"
                label="Password"
                labelStyle={styles.inputLabelStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputInsideStyle}
                placeholderTextColor="black"
                secureTextEntry
                // onChangeText={UserPassword => this.setState({UserPassword})}
                onChangeText={pass => this.setState({ UserPassword: pass })}
                value={this.state.UserPassword}
              />
            ) : null}


            <CheckBox
              activeOpacity={1}
              containerStyle={styles.checkBoxContainer}
              textStyle={{
                fontSize: 12,
                marginLeft: 10,
                color: "black",
                marginBottom: 7,
              }}
              fontFamily="work-sans"
              title="Ingatkan saya"
              checked={this.state.fastShippingChecked === false}
              onPress={() =>
                this.setState({
                  fastShippingChecked: !this.state.fastShippingChecked,
                })
              }
              checkedIcon={
                <View style={styles.checkBoxIconContainer}>
                  <Ionicons name="ios-checkmark" size={20} color="#000000" />
                </View>
              }
              uncheckedIcon={<View style={styles.emptyBox}></View>}
            />

            {/* <Text style={styles.warning}>{this.state.Warning}</Text> */}
            <Button
              buttonStyle={styles.saveButton}
              titleStyle={styles.titleButtonStyle}
              title="Masuk"
              containerStyle={styles.saveButtonContainer}
              onPress={() => this.CallAPI()}
            // onPress={() => alert(this.props.actions.showHideProfile())}
            />

            <Button
              buttonStyle={styles.saveButtonSosmed}
              titleStyle={styles.titleButtonStyleSosmed}
              title="Google"
              containerStyle={styles.saveButtonContainer}
              onPress={() => this._signIn()}
            />

          </View>

          <View style={styles.linkContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Registrasi")}>
              <Text style={styles.linkText}>Daftar</Text>
            </TouchableOpacity>
            <View style={styles.verticalLine} />
            <TouchableOpacity onPress={() => this.props.navigation.navigate("LostPassword")}>
              <Text style={styles.linkText}>Lupa password?</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  showInfo: state.profile.showLogin,
  showInfo1: state.profile.showProfile,
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
