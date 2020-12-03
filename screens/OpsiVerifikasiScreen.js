import { Feather, Ionicons, FontAwesome } from "@expo/vector-icons";
import { AlertHelper } from './AlertHelper';
import React from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";
import { Button, CheckBox, Image, Input, ThemeProvider } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { styles } from "../styles/OpsiVerifikasiStyles";
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

class OpsiVerifikasiScreen extends React.Component {
  // static navigationOptions = {
  //   title: "LoginActivity",
  // };

  constructor(props) {
    super(props);
    this.state = {
      UserEmail: "",
      UserPhone: "",
      Login: "",
      Warning: "",
      isLoading: "",
      isLoading: false,
    };
  }


  static navigationOptions = ({ navigation }) => ({
    
    title: "Verifikasi Akun",
    headerTitleStyle: {
      textAlign: "center",
    },
  });

  sendEmail() {
    return fetch("https://genio.co.id/geniooapi/api/authentication/buyer/Register/sendEmailOTP", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //ini parameternya
        user: this.state.UserEmail,
      }),
    })
      .then(response => response.json()) // response.text())
      .then(responseJson => {
        if (responseJson == this.state.UserEmail) {
          AlertHelper.show('success', '', 'Email terkirim ')
          this.props.navigation.navigate("OTP", {
            user: this.state.UserEmail,
            url: 'sendEmailOTP',
            tipe: 'e-mail'
          });
        }
        else {
          AlertHelper.show('error', 'Error', 'Email gagal terkirim ')
        }
      });
  }

  sendSMS() {
    return fetch("https://genio.co.id/geniooapi/api/authentication/buyer/Register/sendSMSOTP", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //ini parameternya
        user: this.state.UserPhone,
      }),
    })
      .then(response => response.json()) // response.text())
      .then(responseJson => {
        if (responseJson == this.state.UserPhone) {
          AlertHelper.show('success', '', 'SMS terkirim ')
          if (this.state.Login == 1) {
            this.props.navigation.navigate("OTP", {
              user: this.state.UserPhone,
              url: 'sendSMSOTP',
              tipe: 'sms',
              login:this.state.Login
            });
          }
          else {
            this.props.navigation.navigate("OTP", {
              user: this.state.UserPhone,
              url: 'sendSMSOTP',
              tipe: 'sms'
            });
          }
        }
        else {
          AlertHelper.show('error', 'Error', 'SMS gagal terkirim ')
        }
      });
  }

  sendWA() {
    return fetch("https://genio.co.id/geniooapi/api/authentication/buyer/Register/sendWAOTP", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //ini parameternya
        user: this.state.UserPhone,
      }),
    })
      .then(response => response.json()) // response.text())
      .then(responseJson => {
        if (responseJson == this.state.UserPhone) {
          AlertHelper.show('success', '', 'Pesan Whatsapp terkirim ')
          if (this.state.Login == 1) {
            this.props.navigation.navigate("OTP", {
              user: this.state.UserPhone,
              url: 'sendWAOTP',
              tipe: 'whatsapp',
              login: this.state.Login
            });  
          }
          else {
            this.props.navigation.navigate("OTP", {
              user: this.state.UserPhone,
              url: 'sendWAOTP',
              tipe: 'whatsapp',
            });  
          }
        }
        else {
          AlertHelper.show('error', 'Error', 'Pesan Whatsapp gagal terkirim ')
        }
      });
  }

  verifikasi(type) {
        const { UserEmail, UserPhone } = this.state;
        if (type == 'email') {
            this.sendEmail()
        }
        else if(type=='sms'){
            this.sendSMS()
        }
        else {
          this.sendWA()
        }
    }

  async componentDidMount() {
    if(this.props.navigation.state.params.email!== undefined){
      this.setState({
        UserEmail:this.props.navigation.state.params.email,
      })
    }
      if (this.props.navigation.state.params.phone !== undefined) {
          this.setState({
              UserPhone: this.props.navigation.state.params.phone,
          })
      }  
    if (this.props.navigation.state.params.login !== undefined) {
      this.setState({
        Login: this.props.navigation.state.params.login,
      })
    }
  }

  render() {
    const { UserEmail, UserPhone } = this.state;
    return (
      
      <View style={styles.container}>
        <Text style={styles.titleScreenStyle}>Pilih Metode Verifikasi</Text>
        <Text style={styles.descriptionScreenStyle}>
          Pilih salah satu metode dibawah ini untuk mendapatkan kode verifikasi
        </Text>
        {UserEmail ? (
          <TouchableOpacity style={styles.saveButtonSosmed} onPress={() => this.verifikasi('email')}>
            <View style={styles.iconContainerStyle}>
              <Feather name="mail" size={30} color="#00CED1" />
            </View>
            <View style={styles.containerText}>
              <Text style={styles.titleButtonStyleSosmed}>E-mail ke</Text>
              <Text style={styles.textButtonStyleSosmed}>{UserEmail}</Text>
            </View>
          </TouchableOpacity>  
        ):null}
        
        {UserPhone ? (
          <TouchableOpacity style={styles.saveButtonSosmed} onPress={() => this.verifikasi('sms')}>
            <View style={styles.iconContainerStyle}>
              <Feather name="smartphone" size={30} color="#00CED1" />
            </View>
            <View style={styles.containerText}>
              <Text style={styles.titleButtonStyleSosmed}>SMS ke</Text>
              <Text style={styles.textButtonStyleSosmed}>{UserPhone}</Text>
            </View>
          </TouchableOpacity>  
        ):null}
        
        {UserPhone ? (
          <TouchableOpacity style={styles.saveButtonSosmed} onPress={() => this.verifikasi('wa')}>
            <View style={styles.iconContainerStyle}>
              <FontAwesome name="whatsapp" size={30} color="#00CED1" />
            </View>
            <View style={styles.containerText}>
              <Text style={styles.titleButtonStyleSosmed}>Whatsapp ke</Text>
              <Text style={styles.textButtonStyleSosmed}>{UserPhone}</Text>
            </View>
          </TouchableOpacity>  
        ):null}

      </View>  

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

export default connect(mapStateToProps, mapDispatchToProps)(OpsiVerifikasiScreen);
