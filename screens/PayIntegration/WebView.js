import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { WebView } from 'react-native-webview';
const midtransClient = require('midtrans-client');
const emvqr = require('emvqr');
import { format } from "date-fns";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";

class ShowWeb extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			orderId: null,
			url: ""
		}
	}

	static navigationOptions = ({ navigation }) => ({
		title: "Menu Pembayaran",
		headerTitleStyle: {
			textAlign: "center",
		},
	});

	componentDidMount() {
		const { cartItems } = this.props

		let snap = new midtransClient.Snap({
			isProduction: false,
			clientKey: 'SB-Mid-client-eBzi7ynvsBof__UV',
			serverKey: 'SB-Mid-server-VQ2xYlX_d3ROTMurn_XlYY7L'
		});

		let time = format(new Date(), "yyMMddHHmmss");
		let orderId = `G959400119/${time}${Math.floor(Math.random() * 100)}`;
		this.setState({
			orderId: orderId
		})
		let newCartItems = [];
		cartItems.forEach(item => {
			if (item.checked === "check") {
				newCartItems.push({
					id: item.idproduct,
					price: parseInt(item.sellprice),
					quantity: parseInt(item.qty),
					name: item.name,
					brand: "genioo",
					category: "product",
					merchant_name: "genioo"
				})
			}
		})

		newCartItems.push({
			id: this.props.kurirInfo + orderId,
			price: this.props.costInfo,
			quantity: 1,
			name: "Jasa Kurir" + " " + this.props.kurirInfo + " " + "dengan" + " " + "Service" + " " + this.props.serviceInfo,
			brand: "Raja Ongkir",
			category: "Kurir",
			merchant_name: "Raja Ongkir"
		})

		let parameter = {
			transaction_details: {
				order_id: orderId,
				gross_amount: this.props.totalCost,
			},
			"payment_type": "gopay",
			"gopay": {
				"enable_callback": true,                // optional
				"callback_url": "someapps://callback"   // optional
			},
			customer_details: {
				first_name: this.props.penerimaAwal,
				last_name: this.props.penerimaAkhir,
				email: this.props.emailInfo,
				phone: this.props.teleponInfo,
				billing_address: {
					first_name: this.props.penerimaAwal,
					last_name: this.props.penerimaAkhir,
					email: this.props.emailInfo,
					phone: this.props.teleponInfo,
					address: this.props.alamatInfo,
					city: this.props.kotaInfo,
					postal_code: this.props.postal_code,
					country_code: "IDN",
				},
			},
			item_details: newCartItems,
			shipping_address: {
				first_name: "TEST",
				last_name: "MIDTRANSER",
				email: "test@midtrans.com",
				phone: "0 8128-75 7-9338",
				address: "Sudirman",
				city: "Jakarta",
				postal_code: "12190",
				country_code: "IDN"
			},
		};

		// charge transaction
		snap.createTransaction(parameter)
			.then((transaction) => {
				// transaction token
				let transactionToken = transaction.token;
				console.log('transactionToken:', transactionToken);

				// transaction redirect url
				let transactionRedirectUrl = transaction.redirect_url;
				this.setState({
					url: transactionRedirectUrl,
					isLoading: false
				})
				console.log('transactionRedirectUrl:', transactionRedirectUrl);
			})
			.catch((e) => {
				alert(e.message)
				this.setState({
					isLoading: false
				})
				console.log('Error occured:', e.message);
			});
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
			<View style={{ flex: 1 }}>
				<WebView source={{ uri: this.state.url }} />
			</View>

		)
	}
}

let mapStateToProps = state => ({
	cart: state.cart,
	costs: state.cart.costs,
	cartItems: state.cart.cart,
	cartTotal: state.cart.totalCart,
	cityInfo: state.cart.cityResult,
	totalCost: state.cart.totalCost,
	provinceInfo: state.cart.provinceResult,
	penerimaAwal: state.cart.penerimaAwal,
	penerimaAkhir: state.cart.penerimaAkhir,
	teleponInfo: state.cart.telepon,
	alamatInfo: state.cart.alamat,
	postal_code: state.cart.postal_code,
	kotaInfo: state.cart.kota,
	provinsiInfo: state.cart.provinsi,
	originToInfo: state.cart.originTo,
	emailInfo: state.cart.email,
	kurirInfo: state.cart.kurir,
	costInfo: state.cart.costs,
	waktuKirimInfo: state.cart.waktuKirim,
	serviceInfo: state.cart.service,
	isLoading: state.cart.isLoading,
});

const ActionCreators = Object.assign({}, cartActions);

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowWeb);
