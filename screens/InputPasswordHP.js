import React from "react";
import {
    StyleSheet,
    Text,
    View,
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
import Icon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { styles } from "../styles/LoginStyles";

import { NavigationEvents } from 'react-navigation';

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
            UserPhone: this.props.navigation.state.params.phone,
            Warning: '',
            isLoading: '',
            dataSource: '',
            isLoading: false,
            ConfirmPassword: '',
            passwordValidate: true,
            Messange: '',
        };
    }



    validText(data, type) {
        //ini javascript buat email "abc@mail.com"
        const alph = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        //ini javascript buat phone // << max 10-13 , yg diganti yg {5,8} ==> {min, max}
        const num = /^[\+]?[(]?[0-9]{2}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5,8}$/;

        const { UserPassword } = this.state;

        if (type == 'password') {
            //maksimal password >= 2 index alias 3 huruf [0, 1, 2]
            if (UserPassword.length >= 7) {
                this.setState({
                    passwordValidate: true,
                    UserPassword: data.trim(),
                    Messange: ''
                })
                return false;
            } else {
                this.setState({
                    passwordValidate: false,
                    UserPassword: data.trim(),
                    Messange: 'Your password must be at least 8 characters'
                })
                return true;
            }
        }
    }

    //ini validasi kalau ada baris yg kosong
    validate = () => {
        const { UserPassword } = this.state

        if (UserPassword == "") {
            alert("Please fill your password")
            return false
        }

        return true
    }

    //try again #13
    CallAPI = () => {
        const { UserPassword, UserPhone } = this.state;
        this.setState({ loading: true });

        if (this.validate()) {
            return fetch('https://genio.co.id/geniooapi/api/authentication/buyer/Register/inputPasswordHP', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    //ini parameternya 
                    no_hp: UserPhone,
                    password: UserPassword,
                })
            })
                .then((response) => response.json())// response.text())
                .then((responseJson) => {
                    if (responseJson[0].phone !== undefined) {
                        Alert.alert('Nomor Anda Belum diverifikasi');
                        this.props.navigation.navigate("OTP", { phone: responseJson[0].phone })
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
                icon={<Icon name="arrow-alt-left" size={20} color="#000" />}
            />
        ),
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
                            placeholder="**********"
                            // onChangeText={data => this.setState({ UserPassword: data })}
                            onChangeText={(data) => this.validText(data, 'password')}
                            label="Password"
                            labelStyle={styles.inputLabelStyle}
                            inputContainerStyle={styles.inputContainerStyle}
                            inputStyle={styles.inputInsideStyle}
                            placeholderTextColor="black"
                            secureTextEntry
                        />

                        {/* <Text style={styles.warning}>{this.state.Warning}</Text> */}
                        <Text style={styles.notificationText}>
                            {this.state.Messange}
                            {/* Registration confirmation will be emailed to you. */}
                        </Text>

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
