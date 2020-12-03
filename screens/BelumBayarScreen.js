import { Feather, Ionicons, FontAwesome } from "@expo/vector-icons";
import { AlertHelper } from './AlertHelper';
import React from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";
import { Button, CheckBox, Image, Input, ThemeProvider } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { styles } from "../styles/BelumBayarStyles";
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

class BelumBayarScreen extends React.Component {
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

        title: "Belum Bayar",
        headerTitleStyle: {
            textAlign: "center",
        },
    });

    async componentDidMount() {
        
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainer}
                >
                    <View style={styles.container}>
                        <Text style={styles.descriptionScreenStyle}>
                            Bayar Sebelum Selasa, 27 Agustus 2020 13:50 WIB
                    </Text>
                        <View style={styles.containerImage}>
                            <Image
                                source={require('../image/logo-alfamart.png')}
                                style={styles.ImageMerchantStyle}
                            />
                            <View style={styles.containerTotal}>
                                <Text style={styles.descriptionStyle}>
                                    Total
                            </Text>
                                <Text style={styles.priceStyle}>
                                    Rp80.500
                            </Text>
                                <Text style={styles.descriptionStyle}>
                                    Kode Pembayaran
                            </Text>
                                <Text style={styles.kodeStyleBold}>
                                    6-302-20082207322075
                            </Text>
                                <Text style={styles.descriptionStyle}>
                                    Metode Pembayaran
                            </Text>
                                <Text style={styles.titleMerchantStyle}>
                                    Alfamart/Indomaret
                            </Text>
                            </View>
                        </View>
                        <Button
                            buttonStyle={styles.ButtonStyle}
                            titleStyle={styles.titleButtonStyle}
                            title="Bayar Sekarang"
                            onPress={() => this.props.navigation.navigate("TimerPayment")}
                        />
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

export default connect(mapStateToProps, mapDispatchToProps)(BelumBayarScreen);
