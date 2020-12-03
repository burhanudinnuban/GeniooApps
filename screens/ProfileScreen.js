import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { Avatar, Button, Input, ThemeProvider } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as profileActions from "../redux/actions/profileActions";
import * as cartActions from "../redux/actions/cartActions";
import * as productAction from "../redux/actions/productAction";
import LoginScreen from "./LoginScreen";
import colors from "../config/colors";
import { TouchableOpacity } from "react-native";
import { RefreshControl } from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";

const theme = {
  colors: {
    primary: "#000",
  },
};

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      foto: "https:/genio.co.id/genioo/asset/logo/profile-image.png",
      dataSource: "",
      ProfileEmail: "",
      ProfileNama: "",
      ProfileAlamat: "",
      ProfileMobile: "",
      ProfileUsername: "",
      showProfile: false,
      showLogin: false,
      infoUser: "",
      refreshing: false
    };
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.componentDidMount().then(() => {
      this.setState({
        refreshing: false
      })
    })
  }

  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#fff",
      borderBottomWidth: 0,
      marginHorizontal: 24,
      elevation: 0,
    },
    title: "Profil",
    headerTitleStyle: {
      fontFamily: "work-sans-semibold",
      fontSize: 18,
      textAlign: "center",
      flex: 1,
    },
    headerRight: <TouchableOpacity onPress={() => _this._logout()}>
      <View>
        <Text style={{ color: "red" }}>Keluar</Text>
      </View>
    </TouchableOpacity>
  });

  async _logout() {
    await AsyncStorage.clear();
    AsyncStorage.setItem("firstLaunch", "1");
    const data = [];
    this.props.actions.logoutCartData(data);
    this.props.actionsProfile.logoutProfileData(data);
    this.props.navigation.navigate('Auth')
  }

  onScreenFocus = () => {
    // Screen was focused, our on focus logic goes here
    this.myRef.current.scrollTo(0, 0);
  }

  async componentDidMount() {
    this.props.navigation.setParams({
      tapOnTabNavigator: this.onScreenFocus
    })
    _this = this;
    const id_user = await AsyncStorage.getItem('id_konsumen');
    this.props.produk.fetchDataProduct(id_user);
    this.props.actions.fetchCartData(id_user);
    return fetch(
      `https://genio.co.id/geniooapi/api/authentication/buyer/user/detail?id_konsumen=${id_user}`
    )
      .then(response => response.json()) // response.text())
      .then(responseJson => {
        if (responseJson[0].foto !== null) {
          this.setState({
            foto: responseJson[0].foto,
          })

        }
        this.setState(
          {
            isLoading: false,
            infoUser: responseJson[0],
          },
          () => { }
        );
      })
      .catch(error => {
        console.error(error);
      });

  }

  async UpdateProfile() {
    const { ProfileEmail, ProfileNama, ProfileAlamat, ProfileMobile, ProfileUsername } = this.state;

    const id_user = await AsyncStorage.getItem('id_konsumen');

    return fetch(
      `https://genio.co.id/geniooapi/api/authentication/buyer/user/update?id_konsumen=${id_user}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // ini parameternya
          email: ProfileEmail,
          nama_lengkap: ProfileNama,
          alamat_lengkap: ProfileAlamat,
          no_hp: ProfileMobile,
          username: ProfileUsername,
          id_konsumen: id_user,
        }),
      }
    )
      .then(response => response.json()) // response.text())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
            infoUser: "",
          },
          () => {
            this.state.infoUser = this.state.dataSource[0];
            console.log(JSON.stringify(this.state.infoUser));

            if (
              this.state.infoUser.user_email !== undefined ||
              this.state.infoUser.user_email !== ""
            ) {
              if (this.state.infoUser.user_email !== undefined) {
                AsyncStorage.setItem("Email", this.state.infoUser.user_email);
                // AsyncStorage.setItem('password', response.password);
                showMessage({
                  message: "Pembaruan Profil Success",
                  description: "Berhasil Mengubah Profil",
                  type: "success",
                });
                // Alert.alert("Berhasil Mengubah Profil");
                this.componentDidMount();
              } else {
                Alert.alert(responseJson);
                this.componentDidMount();
              }
            } else {
              setTimeout(() => {
                Alert.alert("Gagal Mengubah Profil");
              }, 100);
            }
          }
        );
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    const { infoUser } = this.state;
    return (

      <ThemeProvider theme={theme}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          ref={this.myRef}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <View style={styles.container}>
            <View style={styles.avatarContainer}>
              <Avatar
                containerStyle={{ padding: 2, flex: 1, margin: 10 }}
                rounded
                size="xlarge"
                source={{ uri: this.state.foto }}
              />
              <Text style={styles.nameStyle}>Hello, {infoUser.nama_lengkap}</Text>
            </View>
            <View style={styles.contactDetailsContainer}>
              <Text style={styles.contactText}>Profil Akun</Text>
              <View style={{
                inputsContainer: {
                  backgroundColor: "#EEF2F7",
                  paddingHorizontal: 16,
                  paddingVertical: 24,
                  marginTop: 50,
                  marginBottom: 50,
                  borderRadius: 20,
                },
              }}>
                <Input
                  containerStyle={styles.inputContainerGlobal}
                  placeholder={infoUser.nama_lengkap}
                  label="Nama"
                  labelStyle={styles.inputLabelStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  inputStyle={styles.inputStyle}
                  placeholderTextColor="#000"
                  onChangeText={nama => this.setState({ ProfileNama: nama })}
                  value={this.state.ProfileNama}
                />
                <Input
                  containerStyle={styles.inputContainerGlobal}
                  placeholder={infoUser.user_name}
                  label="Username"
                  labelStyle={styles.inputLabelStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  inputStyle={styles.inputStyle}
                  placeholderTextColor="#000"
                  onChangeText={username => this.setState({ ProfileUsername: username })}
                  value={infoUser.user_name}
                />
                <Input
                  containerStyle={styles.inputContainerGlobal}
                  placeholder={infoUser.no_hp}
                  label="Mobile"
                  labelStyle={styles.inputLabelStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  inputStyle={styles.inputStyle}
                  keyboardType="numeric"
                  placeholderTextColor="#000"
                  onChangeText={mobile => this.setState({ ProfileMobile: mobile })}
                  value={this.state.ProfileMobile}
                />
                <Input
                  containerStyle={styles.inputContainerGlobal}
                  placeholder={infoUser.user_email}
                  label="Email"
                  labelStyle={styles.inputLabelStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  inputStyle={styles.inputStyle}
                  placeholderTextColor="#000"
                  onChangeText={email => this.setState({ ProfileEmail: email })}
                  autoCapitalize="none"
                  value={this.state.ProfileEmail}
                />
                <Input
                  containerStyle={styles.inputContainerGlobal}
                  placeholder={infoUser.alamat_lengkap}
                  label="Alamat"
                  labelStyle={styles.inputLabelStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  inputStyle={styles.inputStyle}
                  placeholderTextColor="#000"
                  onChangeText={alamat => this.setState({ ProfileAlamat: alamat })}
                  value={this.state.ProfileAlamat}
                />
                <Button
                  buttonStyle={styles.saveButton}
                  titleStyle={styles.titleButtonStyle}
                  title="SIMPAN PERUBAHAN"
                  containerStyle={styles.saveButtonContainer}
                  // onPress={() => this.props.navigation.navigate("SavedSuccessful")}
                  onPress={() => this.UpdateProfile()}
                // onPress={() => alert(this.props.showInfo)}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ThemeProvider>
    );
  }
}
const styles = StyleSheet.create({
  headerBackButton: {
    marginLeft: 24,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {},
  line: {
    width: "100%",
    height: 1,
    backgroundColor: colors.primary,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    flex: 1
  },
  nameStyle: {
    fontFamily: "work-sans-semibold",
    fontSize: 14,
    color: colors.white,
    flex: 1,
    margin: 15
  },
  defaultText: {
    fontFamily: "work-sans",
    fontSize: 12,
    marginVertical: 20,
  },
  sortingContainer: {
    marginTop: 32,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
  },
  sortingButtonContainer: {
    padding: 0,
  },
  verticalLine: {
    borderLeftWidth: 1,
    borderRightColor: "#000",
  },
  sortingButtonTitle: {
    color: "#000",
    fontFamily: "work-sans",
    fontSize: 14,
  },
  activeSortingButtonTitle: {
    fontFamily: "work-sans-bold",
  },
  sortingPriceButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sortingButtonIcon: {
    marginRight: 16,
  },
  contactDetailsContainer: {
    marginTop: 10,
    backgroundColor: "#EEF2F7",
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 20,
  },
  contactText: {
    marginBottom: 16,
    fontFamily: "work-sans",
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  inputContainerGlobal: {
    flexDirection: "row",
    padding: 3,
    alignItems: "center",
    marginBottom: 3,
    borderColor: "#00CC99",
    borderWidth: 1,
    paddingVertical: 16,
    backgroundColor: "white",
    borderRadius: 15
  },
  inputLabelStyle: {
    flex: 24,
    fontFamily: "work-sans",
    fontSize: 12,
    color: "#000",
  },
  inputContainerStyle: {
    flex: 76,
    borderBottomColor: "#000000",
    borderBottomWidth: 0,
    borderLeftColor: "#000000",
    borderLeftWidth: 1,
    height: 21,
    paddingLeft: 24,
  },
  inputStyle: {
    fontFamily: "work-sans-semibold",
    fontSize: 12,
  },
  passwordHint: {
    marginTop: 10,
    fontFamily: "work-sans",
    fontSize: 12,
    color: "#CCCCCC",
  },
  saveButton: {
    justifyContent: "space-around",
    height: 45,
    marginTop: 10,
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
  titleButtonStyle: {
    fontFamily: "work-sans-bold",
    fontSize: 18,
    flex: 1,
    textTransform: "uppercase",
  },
});

const mapStateToProps = state => ({
  showInfo: state.profile.showLogin,
  showInfo1: state.profile.showProfile,
  user_id: state.profile.id_user,
});

const ActionCreatorsProfile = Object.assign({}, profileActions);
const ActionCreators = Object.assign({}, cartActions);
const ProductCreators = Object.assign({}, productAction);

const mapDispatchToProps = dispatch => ({
  actionsProfile: bindActionCreators(ActionCreatorsProfile, dispatch),
  actions: bindActionCreators(ActionCreators, dispatch),
  produk: bindActionCreators(ProductCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
