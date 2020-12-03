import { Feather, Ionicons, FontAwesome } from "@expo/vector-icons";
import { AlertHelper } from './AlertHelper';
import React from "react";
import moment from 'moment';
import { 
  ActivityIndicator, 
  Alert, 
  Text, 
  TouchableOpacity, 
  View,
  Clipboard } from "react-native";
import { Button, CheckBox, Image, Input, ThemeProvider } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { styles } from "../styles/TimerPaymentStyles";
import AsyncStorage from "@react-native-community/async-storage";
import * as profileActions from "../redux/actions/profileActions";
import * as cartActions from "../redux/actions/cartActions";
import * as productAction from "../redux/actions/productAction";

const theme = {
  colors: {
    primary: "#000",
  },
};


class DikemasScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      waktu:''
    };
  }


  static navigationOptions = ({ navigation }) => ({
    
    title: "Dikemas",
    
  });


  async componentDidMount() {
   
  }

  render() {
    const { waktu} = this.state;
    return (
      
        <ThemeProvider theme={theme}>
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
            >
                <Text style={styles.descriptionScreenStyle}>
                    Dikemas
                </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(DikemasScreen);
