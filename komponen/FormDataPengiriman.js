import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Button, Input, ThemeProvider } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import RNPicker from "rn-modal-picker";
import * as FormDataPengirimanActions from "../redux/actions/cartActions";
import Colors from "../config/colors";
import AsyncStorage from "@react-native-community/async-storage";
import colors from "../config/colors";

const theme = {
  colors: Colors.white,
};

class FormDataPengiriman extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinsi: "",
      kota: "",
      postal_code: "",
      dataSource: [],
      isLoading: true,
      Alamat: "",
      telepon: "",
      Penerima: "",
      dataSource: this.props.cityInfo,
      placeHolderText: "Please Select Country",
      isLoading: true
    };
    this.arrayholder = [];
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Form Alamat Penerima",
    headerTitleStyle: {
      textAlign: "center",
    },
  });

  _selectedValue(index, item) {
    this.setState({ selectedText: item.city_name });
    this.setState({
      kota: item.city_name,
      originTo: item.city_id,
      provinsi: item.province,
      postal_code: item.postal_code,
    });
  }

  async componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 1500);
    const id_user = await AsyncStorage.getItem("id_konsumen");
    const originTo = await AsyncStorage.getItem("originTo");
    const provinsi = await AsyncStorage.getItem("provinsi");
    const kota = await AsyncStorage.getItem("kota");
    if (originTo !== null) {
      this.setState({
        kota: kota,
        selectedText: kota,
        provinsi: provinsi,
        originTo: originTo
      })
    }
    await fetch(
      `https://genio.co.id/geniooapi/api/authentication/buyer/user/detail?id_konsumen=${id_user}`
    )
      .then(response => response.json()) // response.text())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            infoUser: responseJson[0],
            penerimaAwal: responseJson[0].nama_lengkap,
            alamat: responseJson[0].alamat_lengkap,
            telepon: responseJson[0].no_hp,
            emailPenerima: responseJson[0].email,
          },
          () => { }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  validate(item) {
    if (this.state.kota == "") {
      alert("harap memilih kota terlebih dahulu");
      return false;
    } else if (this.state.provinsi == "") {
      alert("harap memilih kota terlebih dahulu");
      return false;
    } else if (this.state.penerimaAwal == "") {
      alert("harap cantumkan nama awal penerima");
      return false;
    } else if (this.state.penerimaAkhir == "") {
      alert("harap cantumkan nama akhir penerima");
      return false;
    } else if (this.state.alamat == "") {
      alert("harap cantumkan alamat lengkap penerima");
      return false;
    } else if (this.state.telepon == "") {
      alert("harap cantumkan nomor telepon");
      return false;
    } else if (this.state.emailPenerima == "") {
      alert("harap cantumkan email");
      return false;
    }
    this.setState({
      isLoading: true
    })
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
      this.props.actions.setTotalCost()
      this.props.navigation.replace("Checkout");
      this.props.actions.addDataCheckout(item);
    }, 1500);
    return true;
  }

  UpdateFormDataPengiriman(
    penerimaAwal1,
    penerimaAkhir1,
    telepon1,
    alamat1,
    kota1,
    provinsi1,
    origin1,
    email1,
    postal_code1
  ) {
    fetch("https://api.rajaongkir.com/starter/cost",
      {
        method: "POST",
        headers: {
          key: "cf91d83df6f437bd200ec7495b6f2687",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // ini parameternya
          origin: "154",
          destination: origin1,
          weight: "5",
          courier: "jne",
        }),
      })
      .then(resp => resp.json())
      .then(responseJson => {
        if (responseJson !== null) {
          const item = {
            penerimaAwal: penerimaAwal1,
            penerimaAkhir: penerimaAkhir1,
            alamat: alamat1,
            telepon: telepon1,
            kota: kota1,
            provinsi: provinsi1,
            originTo: origin1,
            email: email1,
            postal_code: postal_code1,
          };
          AsyncStorage.setItem("penerimaAwal", penerimaAwal1);
          AsyncStorage.setItem("penerimaAkhir", penerimaAkhir1);
          AsyncStorage.setItem("alamat", alamat1);
          AsyncStorage.setItem("telepon", telepon1);
          AsyncStorage.setItem("email", email1);
          AsyncStorage.setItem("postal_code", postal_code1);
          AsyncStorage.setItem("originTo", origin1);
          AsyncStorage.setItem("kota", kota1);
          AsyncStorage.setItem("provinsi", provinsi1);
          this.validate(item);
          const cartData = [responseJson];
          this.props.actions.setInfoCost(cartData[0].rajaongkir);
        }
      })
  }

  render() {
    console.log("data raja ongkir", this.state.dataSource);
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
          <ActivityIndicator style={{ size: "large" }} />
        </View>
      )
    }
    return (
      <ThemeProvider theme={theme}>
        <SafeAreaView>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View style={{ margin: 10 }}>
              <Text style={styles.inputLabelStyle}>Provinsi :</Text>
              <Text style={{
                marginBottom: 10, fontSize: 14, fontWeight: "bold", color: colors.primary
              }}>
                {this.state.provinsi}
              </Text>
              <Text style={styles.inputLabelStyle}>Kota :</Text>
              <RNPicker
                dataSource={this.state.dataSource}
                dummyDataSource={this.state.dataSource}
                defaultValue={false}
                pickerTitle="Pilih Kota"
                showSearchBar
                disablePicker={false}
                changeAnimation="slide"
                searchBarPlaceHolder="Search....."
                showPickerTitle
                searchBarContainerStyle={this.props.searchBarContainerStyle}
                pickerStyle={styles.pickerStyle}
                value={this.state.selectedText}
                itemSeparatorStyle={styles.itemSeparatorStyle}
                pickerItemTextStyle={styles.listTextViewStyle}
                selectedLabel={this.state.selectedText}
                placeHolder={this.state.placeHolderText}
                selectLabelTextStyle={styles.selectLabelTextStyle}
                placeHolderTextStyle={styles.placeHolderTextStyle}
                dropDownImageStyle={styles.dropDownImageStyle}
                dropDownImage={require("../image/menu.png")}
                selectedValue={(index, item) => this._selectedValue(index, item)}
              />
              <Text style={styles.inputLabelStyle}>Nama Awal :</Text>
              <Input
                containerStyle={styles.inputContainerGlobal}
                placeholder="Masukan nama awal penerima anda"
                placeholderTextColor="#D3D3D3"
                inputContainerStyle={styles.inputContainerStyle}
                value={this.state.penerimaAwal}
                // onChangeText={data => this.setState({ UserPhone: data.trim() })}
                onChangeText={penerimaAwal => this.setState({ penerimaAwal })}
                keyboardType="ascii-capable"
              />
              <Text style={styles.inputLabelStyle}>Nama Akhir :</Text>
              <Input
                containerStyle={styles.inputContainerGlobal}
                placeholder="Masukan nama akhir penerima anda"
                placeholderTextColor="#D3D3D3"
                inputContainerStyle={styles.inputContainerStyle}
                value={this.state.penerimaAkhir}
                // onChangeText={data => this.setState({ UserPhone: data.trim() })}
                onChangeText={penerimaAkhir => this.setState({ penerimaAkhir })}
                keyboardType="ascii-capable"
              />
              <Text style={styles.inputLabelStyle}>Email :</Text>
              <Input
                containerStyle={styles.inputContainerGlobal}
                placeholder="Masukan email anda"
                placeholderTextColor="#D3D3D3"
                value={this.state.emailPenerima}
                inputContainerStyle={styles.inputContainerStyle}
                // onChangeText={data => this.setState({ UserPhone: data.trim() })}
                onChangeText={email => this.setState({ emailPenerima: email })}
                keyboardType="email-address"
              />
              <Text style={styles.inputLabelStyle}>Alamat :</Text>
              <Input
                containerStyle={styles.inputContainerGlobal}
                placeholder="Masukan alamat anda"
                placeholderTextColor="#D3D3D3"
                inputContainerStyle={styles.inputContainerStyle}
                // onChangeText={data => this.setState({ UserPhone: data.trim() })}
                value={this.state.alamat}
                onChangeText={alamat => this.setState({ alamat })}
                keyboardType="default"
              />
              <Text style={styles.inputLabelStyle}>Nomor HP :</Text>
              <Input
                containerStyle={styles.inputContainerGlobal}
                placeholder="Masukan nomor hp anda"
                placeholderTextColor="#D3D3D3"
                inputContainerStyle={styles.inputContainerStyle}
                // onChangeText={data => this.setState({ UserPhone: data.trim() })}
                onChangeText={telepon => this.setState({ telepon })}
                value={this.state.telepon}
                keyboardType="number-pad"
              />
              <Button
                buttonStyle={styles.saveButton}
                titleStyle={styles.titleButtonStyle}
                title="SAVE CHANGES"
                containerStyle={styles.saveButton}
                // onPress={() => this.props.navigation.navigate("SavedSuccessful")}
                onPress={() =>
                  this.UpdateFormDataPengiriman(
                    this.state.penerimaAwal,
                    this.state.penerimaAkhir,
                    this.state.telepon,
                    this.state.alamat,
                    this.state.kota,
                    this.state.provinsi,
                    this.state.originTo,
                    this.state.email,
                    this.state.postal_code
                  )
                }
              />
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  inputContainerGlobal: {
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  inputContainerGlobal1: {
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  saveButton: {
    margin: 15,
    justifyContent: "space-around",
    height: 45,
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },
  titleButtonStyle: {
    fontFamily: "Roboto",
    fontSize: 18,
    textTransform: "uppercase",
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    backgroundColor: "#ffffff",
  },
  inputStyle: {
    fontFamily: "work-sans-semibold",
    fontSize: 12,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  itemSeparatorStyle: {
    height: 1,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#D3D3D3",
  },
  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: "row",
    height: 40,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    borderRadius: 10,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10,
  },

  selectLabelTextStyle: {
    color: "#000",
    textAlign: "left",
    width: "99%",
    padding: 10,
    flexDirection: "row",
  },
  placeHolderTextStyle: {
    color: "#D3D3D3",
    padding: 10,
    textAlign: "left",
    width: "99%",
    flexDirection: "row",
  },
  dropDownImageStyle: {
    width: 17,
    height: 17,
    alignSelf: "center",
  },
  listTextViewStyle: {
    color: "#000",
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: "left",
  },
  pickerStyle: {
    marginLeft: 18,
    elevation: 3,
    paddingRight: 25,
    marginRight: 10,
    marginBottom: 2,
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    borderWidth: 1,
    borderColor: Colors.primary,
    shadowRadius: 10,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    borderRadius: 5,
    flexDirection: "row",
  },
});

const mapStateToProps = state => ({
  cityInfo: state.cart.cityResult,
  costs: state.cart.costs,
  totalCart: state.cart.total,
  provinceInfo: state.cart.provinceResult,
});

const ActionCreators = Object.assign({}, FormDataPengirimanActions);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDataPengiriman);
