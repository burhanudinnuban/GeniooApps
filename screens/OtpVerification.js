import AsyncStorage from "@react-native-community/async-storage";
import { Feather, Ionicons, FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { AlertHelper } from './AlertHelper';
import { ActivityIndicator, Alert, StyleSheet, View,Text } from "react-native";
import RNOtpVerify from "react-native-otp-verify";
import colors from "../src/common/colors";
import ErrorBoundary from "../src/common/ErrorBoundary";
import {
  CustomButton,
  CustomScreenContainer,
  CustomText,
  CustomTextInput,
  FullButtonComponent,
} from "../src/lib";
import { GenericStyles } from "../src/styles/GenericStyles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as profileActions from "../redux/actions/profileActions";
import * as cartActions from "../redux/actions/cartActions";
import * as productAction from "../redux/actions/productAction";
import { isAndroid, logErrorWithMessage } from "../src/utilities/helperFunctions";
import TimerText from "./TimerText";

const RESEND_OTP_TIME_LIMIT = 180; // 30 secs
const AUTO_SUBMIT_OTP_TIME_LIMIT = 4; // 4 secs

let resendOtpTimerInterval;
let autoSubmitOtpTimerInterval;

const OtpVerification = function (props) {
  const { otpRequestData, attempts } = props;
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const user = props.navigation.getParam("user");
  const url = props.navigation.getParam("url");
  const tipe = props.navigation.getParam("tipe");
  const [attemptsRemaining, setAttemptsRemaining] = useState(attempts);
  const [otpArray, setOtpArray] = useState(["", "", "", ""]);
  const [submittingOtp, setSubmittingOtp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // in secs, if value is greater than 0 then button will be disabled
  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(RESEND_OTP_TIME_LIMIT);

  // 0 < autoSubmitOtpTime < 4 to show auto submitting OTP text
  const [autoSubmitOtpTime, setAutoSubmitOtpTime] = useState(AUTO_SUBMIT_OTP_TIME_LIMIT);

  // TextInput refs to focus programmatically while entering OTP
  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);

  // a reference to autoSubmitOtpTimerIntervalCallback to always get updated value of autoSubmitOtpTime
  const autoSubmitOtpTimerIntervalCallbackReference = useRef();

  useEffect(() => {
    // autoSubmitOtpTime value will be set after otp is detected,
    // in that case we have to start auto submit timer
    autoSubmitOtpTimerIntervalCallbackReference.current = autoSubmitOtpTimerIntervalCallback;
  });

  useEffect(() => {
    startResendOtpTimer();

    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  }, [resendButtonDisabledTime]);

  useEffect(() => {
    // docs: https://github.com/faizalshap/react-native-otp-verify

    RNOtpVerify.getOtp()
      .then(p =>
        RNOtpVerify.addListener(message => {
          try {
            if (message) {
              const messageArray = message.split("\n");
              if (messageArray[2]) {
                const otp = messageArray[2].split(" ")[0];
                if (otp.length === 4) {
                  setOtpArray(otp.split(""));

                  // to auto submit otp in 4 secs
                  setAutoSubmitOtpTime(AUTO_SUBMIT_OTP_TIME_LIMIT);
                  startAutoSubmitOtpTimer();
                }
              }
            }
          } catch (error) {
            logErrorWithMessage(
              error.message,
              "RNOtpVerify.getOtp - read message, OtpVerification"
            );
          }
        })
      )
      .catch(error => {
        logErrorWithMessage(error.message, "RNOtpVerify.getOtp, OtpVerification");
      });

    // remove listener on unmount
    return () => {
      RNOtpVerify.removeListener();
    };
  }, []);

  const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  };

  // this callback is being invoked from startAutoSubmitOtpTimer which itself is being invoked from useEffect
  // since useEffect use closure to cache variables data, we will not be able to get updated autoSubmitOtpTime value
  // as a solution we are using useRef by keeping its value always updated inside useEffect(componentDidUpdate)
  const autoSubmitOtpTimerIntervalCallback = () => {
    if (autoSubmitOtpTime <= 0) {
      clearInterval(autoSubmitOtpTimerInterval);

      // submit OTP
    }
    setAutoSubmitOtpTime(autoSubmitOtpTime - 1);
  };

  const startAutoSubmitOtpTimer = () => {
    if (autoSubmitOtpTimerInterval) {
      clearInterval(autoSubmitOtpTimerInterval);
    }
    autoSubmitOtpTimerInterval = setInterval(() => {
      autoSubmitOtpTimerIntervalCallbackReference.current();
    }, 1000);
  };

  const refCallback = textInputRef => node => {
    textInputRef.current = node;
  };

  const onResendOtpButtonPress = () => {
      
    return fetch("https://genio.co.id/geniooapi/api/authentication/buyer/Register/"+url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //ini parameternya
        user: user,
      }),
    })
      .then(response => response.json()) // response.text())
      .then(responseJson => {
        console.log(responseJson[0]);
        if (responseJson == user) {
          if (firstTextInputRef) {
            setOtpArray(["", "", "", ""]);
            firstTextInputRef.current.focus();
          }

          setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
          startResendOtpTimer();
        }
      });
  };

  // this event won't be fired when text changes from '' to '' i.e. backspace is pressed
  // using onOtpKeyPress for this purpose
  const onOtpChange = index => {
    return value => {
      if (isNaN(Number(value))) {
        // do nothing when a non digit is pressed
        return;
      }
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);

      // auto focus to next InputText if value is not blank
      if (value !== "") {
        if (index === 0) {
          secondTextInputRef.current.focus();
        } else if (index === 1) {
          thirdTextInputRef.current.focus();
        } else if (index === 2) {
          fourthTextInputRef.current.focus();
        }
      }
    };
  };

  const cekSubmit = () => {
    if (props.navigation.getParam("login") == 1) {
      verifyLogin()
    }
    else {
      onSubmitButtonPress()
    }
  };

  const onSubmitButtonPress = () => {
    return fetch("https://genio.co.id/geniooapi/api/authentication/buyer/Register/verifySMS", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //ini parameternya
        kode: otpArray.join(""),
        user: user,
      }),
    })
      .then(response => response.json()) // response.text())
      .then(responseJson => {
        if (responseJson == user) {
          AlertHelper.show('success', 'Berhasil', 'OTP Benar')
          if (tipe == 'e-mail') {
            props.navigation.navigate("RegisterEmail",
              {
                tipe: tipe,
                user: user
              }
            );  
          }
          else {
            props.navigation.navigate("RegisterPhone",
              {
                tipe: tipe,
                user:user
              }
            );
          }
        }
        else {
          AlertHelper.show('error', 'Error', responseJson)
        }
      });
  };

  const verifyLogin = () => {
    return fetch("https://genio.co.id/geniooapi/api/authentication/buyer/Login/verifyLogin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //ini parameternya
        kode: otpArray.join(""),
        user: user,
      }),
    })
      .then(response => response.json()) // response.text())
      .then(responseJson => {
        if (responseJson[0].phone !== undefined) {
          AsyncStorage.setItem("Email", responseJson[0].email);
          AsyncStorage.setItem("id_konsumen", responseJson[0].id_user);
          AsyncStorage.setItem("isLoggedIn", "1");
          props.produk.fetchDataProduct(responseJson[0].id_user);
          props.actions.fetchCartData(responseJson[0].id_user);
          props.actionsProfile.fetchProfileData(responseJson[0].id_user);
          Alert.alert(responseJson[0].email, "Login Success");
          if (props.cartItems.length > 0) {
            props.actions.mergeCartData(props.cartItems);
          }
          if (props.FromCart == 1) {
            props.navigation.navigate("FormDataPengiriman",
            { onGoBack: () => props.navigation.navigate("Cart") })
            props.actionsProfile.loginFromCart(0)
          }
          else {
            props.navigation.navigate("Main");
          }
        }
        else {
          AlertHelper.show('error', 'Error', 'OTP Salah ')
        }
      });
  };

  // only backspace key press event is fired on Android
  // to have consistency, using this event just to detect backspace key press and
  // onOtpChange for other digits press
  const onOtpKeyPress = index => {
    return ({ nativeEvent: { key: value } }) => {
      // auto focus to previous InputText if value is blank and existing value is also blank
      if (value === "Backspace" && otpArray[index] === "") {
        if (index === 1) {
          firstTextInputRef.current.focus();
        } else if (index === 2) {
          secondTextInputRef.current.focus();
        } else if (index === 3) {
          thirdTextInputRef.current.focus();
        }

        /**
         * clear the focused text box as well only on Android because on mweb onOtpChange will be also called
         * doing this thing for us
         * todo check this behaviour on ios
         */
        if (isAndroid && index > 0) {
          const otpArrayCopy = otpArray.concat();
          otpArrayCopy[index - 1] = ""; // clear the previous box which will be in focus
          setOtpArray(otpArrayCopy);
        }
      }
    };
  };

  return (
    
    <CustomScreenContainer>
      <ErrorBoundary screenName={"OtpVerification"}>
        <View style={styles.container}>
          <View style={styles.iconContainerStyle}>
            {tipe == "e-mail" ? (<Feather name="mail" size={40} color="#00CED1" />):null}
            {tipe == "whatsapp" ? (<FontAwesome name="whatsapp" size={40} color="#00CED1" />) : null}
            {tipe == "sms" ? (<Feather name="smartphone" size={40} color="#00CED1" />) : null}
          </View>
          <Text style={styles.titleScreenStyle}>Masukkan Kode Aktivasi</Text>
          <Text style={styles.descriptionScreenStyle}>
            Kode verifikasi telah dikirim melalui {tipe} ke {user} 
          </Text>
          <View style={[GenericStyles.row, GenericStyles.mt12]}>
            {[firstTextInputRef, secondTextInputRef, thirdTextInputRef, fourthTextInputRef].map(
              (textInputRef, index) => (
                <CustomTextInput
                  style={GenericStyles.otpText}
                  containerStyle={[GenericStyles.fill, GenericStyles.mr12]}
                  value={otpArray[index]}
                  onKeyPress={onOtpKeyPress(index)}
                  onChangeText={onOtpChange(index)}
                  keyboardType={"numeric"}
                  maxLength={1}
                  autoFocus={index === 0 ? true : undefined}
                  refCallback={refCallback(textInputRef)}
                  key={index}
                />
              )
            )}
          </View>
          {errorMessage ? (
            <CustomText
              style={[
                GenericStyles.negativeText,
                GenericStyles.mt12,
                GenericStyles.centerAlignedText,
              ]}
            >
              {errorMessage}
            </CustomText>
          ) : null}
          {resendButtonDisabledTime > 0 ? (
            <TimerText text={"Kirim Ulang OTP dalam"} time={resendButtonDisabledTime} />
          ) : (
              <CustomButton
                type={"link"}
                text={"Kirim Ulang OTP"}
                buttonStyle={styles.otpResendButton}
                textStyle={styles.otpResendButtonText}
                onPress={onResendOtpButtonPress}
              />
            )}
          <View style={GenericStyles.fill} />
          {submittingOtp && <ActivityIndicator />}
          {autoSubmitOtpTime > 0 && autoSubmitOtpTime < AUTO_SUBMIT_OTP_TIME_LIMIT ? (
            <TimerText text={"Submitting OTP in"} time={autoSubmitOtpTime} />
          ) : null}

          <FullButtonComponent
            type={"fill"}
            text={"Submit"}
            textStyle={styles.submitButtonText}
            buttonStyle={GenericStyles.mt24}
            onPress={cekSubmit}
            disabled={submittingOtp}
          />
        </View>
      </ErrorBoundary>
    </CustomScreenContainer>
  );
};

OtpVerification['navigationOptions'] = screenProps => ({
  title:'Verifikasi Akun'
})

const styles = StyleSheet.create({
  otpText: {
    textAlign: "center",
    fontWeight: "bold",
    color: colors.BLUE,
    fontSize: 18,
    width: "100%",
  },
  container: {
    padding: 16,
    flex: 1,
  },
  titleScreenStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: "center",
    marginLeft: 0,
    marginTop: 10,
  },
  descriptionScreenStyle: {

    fontSize: 13,
    textAlign: "center",
    marginLeft: 0,
    marginTop: 10,
    marginBottom: 30,
  },
  iconContainerStyle: {
    marginTop: 15,
    alignItems: "center",
  },
  submitButtonText: {
    color: colors.WHITE,
  },
  otpResendButton: {
    alignItems: "center",
    width: "100%",
    marginTop: 16,
  },
  otpResendButtonText: {
    color: colors.ORANGE,
    textTransform: "none",
    textDecorationLine: "underline",
  },
});

const mapStateToProps = state => ({
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
export default connect(mapStateToProps, mapDispatchToProps)(OtpVerification);
