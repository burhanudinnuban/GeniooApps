import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Alert,
    AsyncStorage,
    ActivityIndicator
} from "react-native";
import {Button, ThemeProvider, Input, Image, CheckBox} from "react-native-elements";
import {Ionicons} from "@expo/vector-icons";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scrollview";
import {styles} from "../styles/LoginStyles"
// import {NavigationActions} from 'react-navigation';

const theme = {
  colors: {
    primary: "#000",
  },
};

//dummy
// const userinfo ={user:'admin', pass:'123'}

export default class AuthScreen extends React.Component {
  static navigationOptions =
   {
      title: 'LoginActivity',
   };

  constructor(props) {
    super(props);
    this.state = {
      fastShippingChecked: false,
      UserEmail: '',
      UserPassword: '',
      Warning:'',
      isLoading:'',
      dataSource:'',
      isLoading: false,
    };
  }

  // UserLoginFunction = () => {
  //   const { UserEmail }  = this.state ;
  //   const { UserPassword }  = this.state ;

  //   fetch('https://maturan.co/v1/api/buyer', {
  //     // fetch('https://maturan.co/v1/api/buyer?email='+ UserEmail +'&password='+ UserPassword +'', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ 
  //       email: UserEmail,
  //       password: UserPassword
  //     })
  //   })
  //   .then((response) => response.text())//response.json())
  //     .then((responseJson) => {
  //       // If server response message same as Data Matched
  //      if(responseJson !== 'Data Matched')
  //      {
  //          //Then open Profile activity and send user email to profile activity.
  //         //  this.props.navigation.navigate('Second', { Email: UserEmail });
  //         this.props.navigation.navigate('Home');
  //      }
  //      else{
  //        Alert.alert(responseJson);
  //       //  Alert.alert('Email/Phone or Password failed. Please try agaim...');
  //      }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }
   
  //percobaan 9//
  // _Login = async() => {

  //   if(userinfo.user === this.state.UserEmail && userinfo.pass=== this.state.UserPassword){
  //     // alert('Login sukses')
  //     await AsyncStorage.setItem('isLoggedIn', '1');
  //     this.props.navigation.navigate('Home');
  //   }
  //   else {
  //     // alert('The username and password you entered did not match our records. Please double-check and try again.')
  //     alert(' Incorrect Username/Password Used \n Please try again…')
  //   }
  // }

  validate = () => {
    const {UserEmail, UserPassword} = this.state
    if (UserEmail == ""){
      alert("Please fill your email/phone")
      return false
    } else if (UserPassword == ""){
      alert("Please fill your password")
      return false
    }
    return true
  }

  //try again #13
  CallAPI = () => {
    const {UserEmail, UserPassword} = this.state;
    this.setState({loading: true});

    if (this.validate()) {
        return fetch('https://maturan.co/v1/api/buyer/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              //ini parameternya 
              user: UserEmail, 
              password: UserPassword
            })
        })
            .then((response) => response.json())// response.text())
              .then((responseJson) => {
                this.setState({
                        isLoading: false
                    }, () => {
                          if (responseJson !== undefined || responseJson !== '') {
                            if(responseJson === 'Data Matched'){
                            AsyncStorage.setItem('user', UserEmail);
                            // AsyncStorage.setItem('password', response.password);
                            AsyncStorage.setItem('isLoggedIn', '1');
                            this.props.navigation.navigate('Home');
                          }
                          else{
                            Alert.alert(responseJson);
                          }
                        } else {
                            setTimeout(() => {
                                Alert.alert('Warning', 'Your Username / Password was wrong!');
                            }, 100);
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                })
    }
    // else {
    //   Alert.alert('Warning', 'Username / Password Failed!');
    // }
}

  static navigationOptions = ({ navigation }) => ({
    header: null,
  });

  render() {
    if (this.state.isLoading){
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    } 
    else {
      return(
        <ThemeProvider theme={theme}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <View>
            <Image
              style={styles.logo}
              source={require('../image/maturann.png')}
            />
          </View>
          <View style={styles.inputsContainer}>
            <Input
              containerStyle={styles.inputContainerGlobal}
              placeholder="E-mail / Phone"
              label="Email"
              labelStyle={styles.inputLabelStyle}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputInsideStyle}
              placeholderTextColor="red"
              // onChangeText={UserEmail => this.setState({UserEmail})}
              onChangeText={(user) => this.setState({UserEmail: user})}
              value={this.state.UserEmail}
              autoCapitalize={'none'}
            />
            <Input
              containerStyle={styles.inputContainerGlobal}
              placeholder="Password"
              label="Password"
              labelStyle={styles.inputLabelStyle}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputInsideStyle}
              placeholderTextColor="red"
              secureTextEntry
              // onChangeText={UserPassword => this.setState({UserPassword})}
              onChangeText={(pass) => this.setState({UserPassword: pass})}
              value={this.state.UserPassword}
            />

            <CheckBox
              activeOpacity={1}
              containerStyle={styles.checkBoxContainer}
              textStyle={{
                fontSize: 12,
                marginLeft: 24,
                color: "red",
                marginBottom: 7,
              }}
              fontFamily="work-sans"
              title="Remember me"
              checked={this.state.fastShippingChecked === false}
              onPress={() =>
                this.setState({
                  fastShippingChecked: !this.state.fastShippingChecked,
                })
              }
              checkedIcon={
                <View style={styles.checkBoxIconContainer}>
                  <Ionicons name="ios-checkmark" size={20} color="#fff" />
                </View>
              }
              uncheckedIcon={<View style={styles.emptyBox}></View>}
            /> 

            {/* <Text style={styles.warning}>{this.state.Warning}</Text> */}

            <Button
              buttonStyle={styles.saveButton}
              titleStyle={styles.titleButtonStyle}
              title="LOG IN"
              containerStyle={styles.saveButtonContainer}
              //onPress={() => this.props.navigation.navigate("Home")}
              // onPress={this.UserLoginFunction}
              // onPress= {this._Login}
              onPress={()=>this.CallAPI()}
            />
          </View>
          <View style={styles.linkContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Registrasi")}>
              <Text style={styles.linkText}>Register</Text>
            </TouchableOpacity>
            <View style={styles.verticalLine} />
            <TouchableOpacity onPress={() => this.props.navigation.navigate("LostPassword")}>
              <Text style={styles.linkText}>Lost your password?</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </ThemeProvider>
      )
    }
  }
}