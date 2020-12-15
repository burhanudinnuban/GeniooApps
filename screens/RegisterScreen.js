import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import OpsiVerifikasiScreen from "../screens/OpsiVerifikasiScreen"
import { Button, Image, Input, ThemeProvider } from "react-native-elements";
import { AccessToken, LoginButton } from "react-native-fbsdk";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "react-native-google-signin";
// import {Ionicons} from "@expo/vector-icons";
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

class RegistrationEmailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fastShippingChecked: false,
      UserEmail: "",
      UserAkun: "",
      UserNama: "",
      UserFoto: "",
      UserPhone: "",
      UserPassword: "",
      Tipe:"",
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
        Messange: "Masukkan email yang benar",
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
    const { UserAkun, UserPhone, UserPassword, ConfirmPassword } = this.state;

    if (UserAkun == "") {
      alert("Please fill your account");
      return false;
    }
    
    return true;
  };

  async componentDidMount() {
    
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
        .then((response) => response.json()) // response.text())
        .then((responseJson) => {
          if (responseJson[0].email !== undefined ||responseJson[0].email !== "") {
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

                this.props.navigation.navigate("FormDataPengiriman",
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
  


  registration_Function = () => {
    const { UserAkun, Tipe, UserPassword } = this.state;
    this.setState({ loading: true });

    if (this.validate()) {
      return fetch(
        "https://genio.co.id/geniooapi/api/authentication/buyer/Register/cek_akun",
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
                  if (Tipe =='email') {
                    if(responseJson == 0){
                      this.props.navigation.navigate("OpsiVerifikasi",{email:UserAkun});
                    }
                    else{
                      Alert.alert(
                        "Email Sudah Terdaftar",
                        "Lanjut masuk dengan email ini " + UserAkun + "?",
                        [
                          { text: 'Ubah', onPress: () => console.log('No button clicked'), style: 'cancel' },
                          { text: 'Ya, Masuk', onPress: () => this.props.navigation.navigate("Login",{email: UserAkun}) },
                        ],
                        {
                          cancelable: true
                        }
                      );
                    }
                  }
                  else {
                    // if( responseJson == 0){
                    //   this.props.navigation.navigate("OpsiVerifikasi", { phone: UserAkun });
                    // }
                    // else{
                    //   Alert.alert(
                    //     "Nomor Ponsel Sudah Terdaftar", 
                    //     "Lanjut masuk dengan nomor ini " + UserAkun + "?",
                    //     [
                    //       { text: 'Ubah', onPress: () => console.log('No button clicked'), style: 'cancel' },
                    //       { text: 'Ya, Masuk', onPress: () => this.props.navigation.navigate("OpsiVerifikasi", { phone: UserAkun, login: 1 })},
                    //     ],
                    //     {
                    //       cancelable: true
                    //     }
                    //   );
                    // }

                    Alert.alert(
                      "Isikan alamat email yang benar"
                    );
                    
                  }
            }
          );
        });
    }
  };

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkTextHeader}>Masuk</Text>
      </TouchableOpacity>
    ),
    title: "Daftar",
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
                placeholder="Masukkan email anda"
                // onChangeText={data => this.setState({ UserEmail: data.trim() })}
                onChangeText={(data) => this.validText(data, "user")}
                label="Email"
                labelStyle={styles.inputLabelStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputInsideStyle}
                placeholderTextColor="black"
              />
              {/* <Input
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
              /> */}

              <Button
                buttonStyle={styles.saveButton}
                titleStyle={styles.titleButtonStyle}
                title="DAFTAR"
                containerStyle={styles.saveButtonContainer}
                onPress={()=>this.registration_Function()}
              />
              {/* <TouchableOpacity style={styles.saveButtonSosmed} onPress={() => this._signIn()}>
                <Image
                  source={require('../image/icon-google.png')}
                  style={styles.imageIconStyle}
                />
                <Text style={styles.titleButtonStyleSosmed}>Google</Text>
              </TouchableOpacity> */}
              
            </View>
            <View style={styles.linkContainer}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Login")}
              >
                <Text style={styles.linkText}>Masuk</Text>
              </TouchableOpacity>
              <View style={styles.verticalLine} />
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("LostPassword")}
              >
                <Text style={styles.linkText}>Lupa password?</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ThemeProvider>
    );
  }
}
const mapStateToProps = state => ({
  cartItems: state.cart.cart
});
const ActionCreatorsProfile = Object.assign({}, profileActions);
const ActionCreators = Object.assign({}, cartActions);
const ProductCreators = Object.assign({}, productAction);

const mapDispatchToProps = dispatch => ({
  actionsProfile: bindActionCreators(ActionCreatorsProfile, dispatch),
  actions: bindActionCreators(ActionCreators, dispatch),
  produk: bindActionCreators(ProductCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationEmailScreen);