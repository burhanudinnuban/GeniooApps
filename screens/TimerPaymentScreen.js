import { Feather, Ionicons, FontAwesome } from "@expo/vector-icons";
import { AlertHelper } from './AlertHelper';
import  DetailOrder  from './DetailOrderScreen';
import Modal from 'react-native-sliding-modal';
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
// import {NavigationActions} from 'react-navigation';

const theme = {
  colors: {
    primary: "#000",
  },
};

class TimerPaymentScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      countdown: [
        // {
        //   unit: 'days',
        //   value: ''
        // },
        {
          unit: 'hours',
          value: ''
        },
        {
          unit: 'mins',
          value: ''
        },
        {
          unit: 'secs',
          value: ''
        }
      ],
      waktu: '',
      showModal: false
    };
    this.timer = null;
    this.endDate = moment('2020-08-27 13:50:03', 'YYYY-MM-DD hh:mm:ss').format('X');
  }


  static navigationOptions = ({ navigation }) => ({
    
    title: "Selesaikan Pembayaran",
    
  });

  lihatDetail(){
    Alert.alert("sukses")
  }

  startCountdown() {
    let countdown = this.state.countdown;
    let distance;
    
    this.timer = setInterval(() => {
      distance = this.endDate - moment().format('X');
      if (distance > 0) {
        // Hours
        countdown[0].value = parseInt(distance % (60 * 60 * 24) / (60 * 60), 10);
        // Minutes
        countdown[1].value = parseInt(distance % (60 * 60) / (60), 10);
        // Seconds
        countdown[2].value = parseInt(distance % 60, 10);
        this.setState({
          countdown: countdown,
          waktu: `${countdown[0].value}:${countdown[1].value}:${countdown[2].value}`
        });
      }
      else {
        countdown = countdown.map(unit => {
          unit.value = '';
          return unit;
        });
        clearInterval(this.timer);
        this.setState({
          countdown
        });
      }
      
    },1000);
  }

  async componentDidMount() {
   this.startCountdown();
  }

  openModal() {
    this.setState({ showModal: true })
  }

  closeModal() {
     this.setState({ showModal: false })
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
                    Batas Akhir Pembayaran
                </Text>
                <View style={styles.containerText}>
                  <Text style={styles.descriptionScreenStyleBold}>
                    Selasa, 27 Agustus 2020 13:50 WIB
                  </Text>
                  <Text style={styles.TimerStyle}>
                    {waktu}
                  </Text>  

                </View>
                <View style={styles.line} />
                <View style={styles.containerText}>
                  <Text style={styles.titleMerchantStyle}>
                      Alfamart/Indomaret
                  </Text>
                  <Image
                    source={require('../image/logo-alfamart.png')}
                    style={styles.ImageMerchantStyle}
                  />                  
                </View>
                <View style={styles.lineTipis} />
                <Text style={styles.descriptionScreenStyle}>
                    Kode Pembayaran
                </Text>
                <View style={styles.containerText}>
                  <Text style={styles.kodeStyleBold}>
                    6-302-20082207322075
                  </Text>
                  <TouchableOpacity style={styles.copyButton} onPress={() => Clipboard.setString('6-302-20082207322075')}>
                    <Text style={styles.textLinkBold}>
                      Salin
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.descriptionScreenStyle}>
                    Total Pembayaran
                </Text>
                <View style={styles.containerText}>
                  <Text style={styles.priceStyle}>
                    Rp80.500
                  </Text>  
            
            <TouchableOpacity style={styles.copyButton} onPress={() => this.setState({ showModal: true })}>
                  <Text style={styles.textLinkBold}>
                    Lihat Detail
                  </Text>
                </TouchableOpacity>
              
              
                </View>
                <View style={styles.lineTipis} />
                <TouchableOpacity style={styles.caraPembayaranButton}>
                    <Text style={styles.textLinkCenterBold}>
                      Lihat Cara Pembayaran
                    </Text>
                </TouchableOpacity>
                <View style={styles.line} />
                <Text style={styles.descriptionCenterStyle}>
                    Pesananmu baru diteruskan ke penjual setelah pembayaran terverifikasi
                </Text>
                <Button
                  buttonStyle={styles.ButtonStyle}
                  titleStyle={styles.titleButtonStyle}
                  title="Belanja Lagi"
                  // onPress={() => this.CallAPI()}
                />
                <Button
                  buttonStyle={styles.ButtonWhiteStyle}
                  titleStyle={styles.titleButtonWhiteStyle}
                  title="Cek Status Pembayaran"
                  // onPress={() => this.CallAPI()}
                />
                <Modal
                show={this.state.showModal}
                closeCallback={()=>this.closeModal()}
                top={100}
                fullScreenCallback={() => { }}
                >
                  <Modal.Header>
                    <Text style={styles.titleModalStyle}>
                      Detail Pembayaran
                    </Text>  
                  </Modal.Header>
                  <DetailOrder/>
              </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(TimerPaymentScreen);
