import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
  } from 'react-native';
import PaymentGateway from 'react-native-midtrans-payment';
const midtransClient = require('midtrans-client');

export default class Midtrans extends Component {
    constructor(props) {
      super(props);
      this.state = {
        yuerel: '',
      };
    }
    async pay1() {
      // Create Snap API instance
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: 'SB-Mid-server-KwD1SOryRA9QmJRtLuv7uw40',
        clientKey: 'SB-Mid-client-cUOnTtFZi_sZ59D4',
      });
  
      let parameter = {
        transaction_details: {
          order_id: 'test-transaction-130',
          gross_amount: 1000,
        },
        credit_card: {
          secure: true,
        },
      };
      await snap.createTransactionRedirectUrl(parameter).then(url => {
        //Actions.push('ViewScreen',{yuerel : url}),
        console.log('yuerel :' + url);
        this.state.yuerel = url;
        this.props.navigation.navigate("ViewScreen", {yuerel: url,})
      });
    }
    async pay2() {
      // await Alert.alert('Hai')
      const optionConnect = {
        clientKey: 'SB-Mid-client-yn8w4QpXkErH4ZkH',
        urlMerchant: 'https://maturan.co/v1/', // will hit https://domain.net/charge
        sandbox: true, // works on iOS only, change it to false on production
      };
      const transRequest = {
        transactionId: '0001',
        totalAmount: 4000,
      };
  
      const itemDetails = [{id: '001', price: 1000, qty: 4, name: 'peanuts'}];
  
      const creditCardOptions = {
        saveCard: false,
        saveToken: false,
        paymentMode: 'Normal',
        secure: false,
      };
  
      const userDetail = {
        fullName: 'jhon',
        email: 'jhon@payment.com',
        phoneNumber: '0850000000',
        userId: 'U01',
        address: 'street coffee',
        city: 'yogyakarta',
        country: 'IDN',
        zipCode: '59382',
      };
  
      const optionColorTheme = {
        primary: '#c51f1f',
        primaryDark: '#1a4794',
        secondary: '#1fce38',
      };
  
      const optionFont = {
        defaultText: 'open_sans_regular.ttf',
        semiBoldText: 'open_sans_semibold.ttf',
        boldText: 'open_sans_bold.ttf',
      };
  
      const callback = res => {
        console.log(res);
      //   Alert.alert(JSON.stringify(res));
      };
      await PaymentGateway.checkOut(
        optionConnect,
        transRequest,
        itemDetails,
        creditCardOptions,
        userDetail,
        optionColorTheme,
        optionFont,
        callback,
      );
    }
    render() {
        return (
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>MIDTRANS (I) {"\n"}
                use midtrans-nodejs-client</Text>
              <TouchableOpacity onPress={async () => await this.pay1()}>
                <Text style={styles.sectionDescription}>CLICK HERE TO PAY (I)</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>MIDTRANS (II) {"\n"}
                use react-native-midtrans-payment
              </Text>
              <TouchableOpacity onPress={async () => await this.pay2()}>
                <Text style={styles.sectionDescription}>CLICK HERE TO PAY (II)</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "white",
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: "black",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: "black",
  },
});

