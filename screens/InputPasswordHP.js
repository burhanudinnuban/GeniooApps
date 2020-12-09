import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import {
  Button,
  ThemeProvider,
  Input,
  Image,
  CheckBox,
} from "react-native-elements";
import {
  GoogleSignin,
} from 'react-native-google-signin';
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { styles } from "../styles/LoginStyles";

import {NavigationEvents} from 'react-navigation';

const theme = {
  colors: {
    primary: "#000",
  },
};

//dummy
// const userinfo ={user:'admin', pass:'123'}

export default class InputPasswordScreen extends React.Component {
  static navigationOptions = {
    title: "LoginActivity",
  };

  constructor(props) {
    super(props);
    
    this.state = {
      fastShippingChecked: false,
      UserPassword: '',
      UserPhone: '',
      UserEmail : this.props.navigation.state.params.email,
      Warning: '',
      isLoading: '',
      dataSource: '',
      isLoading: false,
      ConfirmPassword: '',
      emailValidate: true,
      phoneValidate: true,
      passwordValidate: true,
      Messange:'',
    };
  }

  

  validText(data, type){
    //ini javascript buat email "abc@mail.com"
    const alph = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //ini javascript buat phone // << max 10-13 , yg diganti yg {5,8} ==> {min, max}
    const num = /^[\+]?[(]?[0-9]{2}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5,8}$/;

    const { UserPassword } = this.state;

    if (type == 'email'){
      if(alph.test(data)){
        // Alert.alert('yeay')
        this.setState({
          emailValidate:true,
          UserEmail: data.trim(),
          Messange: ''
        })
        return false;
      } else {
        // Alert.alert('incorrenct')
        this.setState({
          emailValidate:false,
          Messange: 'Please enter a valid email address'
        })
        return true;
      }
    }
    if (type == 'phone'){
      if(num.test(data)){
        this.setState({
          phoneValidate:true,
          UserPhone: data.trim(),
          Messange: ''
        })
        return false;
      } else {
        this.setState({
          phoneValidate:false,
          Messange: 'Please enter a valid phone number'
        })
        return true;
      }
    }    
    if (type == 'password'){
      //maksimal password >= 2 index alias 3 huruf [0, 1, 2]
      if (UserPassword.length >= 2 ){
        this.setState({
          passwordValidate:true,
          UserPassword: data.trim(),
          Messange: ''
        })
        return false;
      } else {
        this.setState({
          passwordValidate:false,
          UserPassword: data.trim(),
          Messange: 'Your password must be at least 3 characters'
        })
        return true;
      }
    }
  }

  //ini validasi kalau ada baris yg kosong
  validate = () => {
    const {UserEmail, UserPhone, UserPassword, ConfirmPassword} = this.state
    // if (UserEmail == "") {
    //     alert("Please fill your email")
    //     return false
    // } else 
    if (UserPhone == "") {
        alert("Please fill your number phone")
        return false
    } else if (UserPassword == "") {
        alert("Please fill your password")
        return false
    } 
    // else if (UserPassword !== ConfirmPassword) {
    //     alert("Your Password and Confim Password was Wrong!")
    //     return false
    // }
    return true
}

  //try again #13
  CallAPI = () => {
    const { UserPassword,UserPhone } = this.state;
    this.setState({ loading: true });

    if (this.validate()) {
      return fetch('https://genio.co.id/geniooapi/api/authentication/buyer/Register/inputPassword', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          //ini parameternya 
          no_hp: UserPhone,
          password: UserPassword,
          user :  this.state.UserEmail
        })
      })
        .then((response) => response.json())// response.text())
        .then((responseJson) => {
          if (responseJson[0].email !== undefined || responseJson[0].email !== '') {
            if(responseJson[0].active_otp == '1'){
              AsyncStorage.setItem('Email', responseJson[0].email);
              AsyncStorage.setItem('id_konsumen', responseJson[0].id_user);
              // AsyncStorage.setItem('password', response.password);
              AsyncStorage.setItem('isLoggedIn', '1');
              Alert.alert(responseJson[0].email, 'Login Success');
              this.props.navigation.navigate('Main'); 
            }
            else{
              Alert.alert('Nomor Anda Belum diverifikasi');
              this.props.navigation.navigate("OTP", { phone: responseJson[0].phone })
            }
            
          }
          else {
            Alert.alert(responseJson);
          }
            
        })
    }
    // else {
    //   Alert.alert('Warning', 'Username / Password Failed!');
    // }
  };

  static navigationOptions = ({ navigation }) => ({
    header: null,
  });

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <ThemeProvider theme={theme}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <View>
            <Image
              style={styles.logo}
              source={{
                uri:
                  "https:/genio.co.id/genioo/asset/logo/logo-genio-apps-3f0fc1571add.jpg",
              }}
            />
          </View>
          <View style={styles.inputsContainer}>
          <Input
              containerStyle={styles.inputContainerGlobal}
              placeholder="081234567890"
              // onChangeText={data => this.setState({ UserPhone: data.trim() })}
              onChangeText={(data)=> this.validText(data,'phone')}
              label="Phone"
              labelStyle={styles.inputLabelStyle}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputInsideStyle}
              placeholderTextColor="black"
              keyboardType='phone-pad'
            />
            <Input
              containerStyle={styles.inputContainerGlobal}
              placeholder="**********"
              // onChangeText={data => this.setState({ UserPassword: data })}
              onChangeText={(data)=> this.validText(data,'password')}
              label="Password"
              labelStyle={styles.inputLabelStyle}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputInsideStyle}
              placeholderTextColor="black"
              secureTextEntry
            />

            {/* <Text style={styles.warning}>{this.state.Warning}</Text> */}
            <View style={styles.checkBoxContainer}>
              <Text style={styles.notificationText}> 
                {this.state.Messange}
                {/* Registration confirmation will be emailed to you. */}
              </Text>
            </View>   
            <Button
              buttonStyle={styles.saveButton}
              titleStyle={styles.titleButtonStyle}
              title="REGISTER"
              containerStyle={styles.saveButtonContainer}
              //onPress={() => this.props.navigation.navigate("Home")}
              // onPress={this.UserLoginFunction}
              // onPress= {this._Login}
              
              onPress={() => this.CallAPI()}
            />
          </View>
          <View style={styles.linkContainer}>
          </View>
        </KeyboardAwareScrollView>
      </ThemeProvider>
    );
  }
}
