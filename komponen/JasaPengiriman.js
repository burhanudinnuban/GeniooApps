import * as React from "react";
import { connect } from "react-redux";
import { SafeAreaView, Button, Text, View, ActivityIndicator, Image } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { bindActionCreators } from "redux";
import * as FormDataPengirimanActions from "../redux/actions/cartActions";
import Colors from "../config/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

class JasaPengiriman extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            api: "cf91d83df6f437bd200ec7495b6f2687",
            isLoading: true
        };
        this.arrayholder = [];
    }

    validation() {
        setTimeout(() => {
            this.setState({
                isLoading: false,
            })
            this.props.navigation.navigate("Checkout");
        }, 2000);
    }

    static navigationOptions = ({ navigation }) => ({
        title: "Pilihan Pengiriman",
        headerTitleStyle: {
            textAlign: "center",
        },
    });

    setkurir(kurir) {
        this.setState({ kurir: kurir });
        this.props.actions.setKurir(kurir);
        let data = {
            weight: this.props.cartItems[0].weight,
            originTo: this.props.originToInfo,
            kurir: this.props.kurirInfo,
        };
        fetch("https://api.rajaongkir.com/starter/cost", {
            method: "POST",
            headers: {
                key: "cf91d83df6f437bd200ec7495b6f2687",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // ini parameternya
                origin: "123",
                destination: this.props.originToInfo,
                weight: "234",
                courier: this.props.kurirInfo,
            }),
        })
            .then(response => response.json())
            .then(responseJson => {
                this.props.actions.fetchCost(data);
                this.props.actions.setTotalCost()
                this.setState(
                    {
                        isLoading: true,
                        dataSource: responseJson,
                    },
                    function () {
                        this.arrayholder = responseJson;
                    }
                );
            })
            .catch(error => {
                console.error(error);
            });
        this.validation();
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 1000);
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
                    <ActivityIndicator style={{ size: "large" }} />
                </View>
            )
        }
        return (
            <SafeAreaView style={{
                flex: 1,
                justifyContent: "center",
                alignContent: "center",
            }}>
                <KeyboardAwareScrollView>
                    <View style={{
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "center",
                        alignContent: "center",
                        margin: 5
                    }}>
                        <TouchableOpacity onPress={() => this.setkurir("jne")}>
                            <View style={{
                                justifyContent: "center",
                                alignItems: "center",
                                margin: 5,
                                borderRadius: 15,
                                backgroundColor: Colors.primary
                            }}>
                                <Image
                                    style={{ height: 150, width: 200, margin: 7 }}
                                    source={require('../image/jnelogo.png')} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setkurir("pos")}>
                            <View style={{
                                justifyContent: "center",
                                alignItems: "center",
                                margin: 5,
                                borderRadius: 15,
                                backgroundColor: Colors.primary
                            }}>
                                <Image
                                    style={{ height: 125, width: 180, margin: 7 }}
                                    source={require('../image/poslogo.png')} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setkurir("tiki")}>
                            <View style={{
                                borderRadius: 5,
                                justifyContent: "center",
                                alignItems: "center",
                                margin: 5,
                                borderRadius: 15,
                                backgroundColor: Colors.primary
                            }}>
                                <Image
                                    style={{ height: 125, width: 280, margin: 7 }}
                                    source={require('../image/logotiki.png')} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => ({
    cityInfo: state.cart.cityResult,
    provinceInfo: state.cart.provinceResult,
    cartInfo: state.cart.cartInfo,
    costs: state.cart.costs,
    totalCart: state.cart.total,
    cartItems: state.cart.cart,
    cartTotal: state.cart.total,
    penerimaInfo: state.cart.penerima,
    teleponInfo: state.cart.telepon,
    alamatInfo: state.cart.alamat,
    kotaInfo: state.cart.kota,
    provinsiInfo: state.cart.provinsi,
    originToInfo: state.cart.originTo,
    kurirInfo: state.cart.kurir,
    costInfo: state.cart.costs,
    waktuKirimInfo: state.cart.waktuKirim,
    serviceInfo: state.cart.service,
});

const ActionCreators = Object.assign({}, FormDataPengirimanActions);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(JasaPengiriman);
