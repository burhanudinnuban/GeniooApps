'use strict';

import React from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

class ScanScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ""
		};
	}
	onSuccess = e => {
		// alert(e.data)
		console.log("data", e.data);
		this.setState({
			// value: e.data
		})
		this.props.navigation.navigate("GoPay", { value: this.state.value })
	};

	render() {
		return (
			<QRCodeScanner
				onRead={this.onSuccess}
				// flashMode={RNCamera.Constants.FlashMode.torch}
				topContent={
					<Text style={styles.centerText}>
						scan the QR code.
          </Text>
				}
				bottomContent={
					<TouchableOpacity style={styles.buttonTouchable}
						onPress={this.onSuccess()}>
						<Text style={styles.buttonText}>OK. Got it!</Text>
					</TouchableOpacity>
				}
			/>
		);
	}
}

const styles = StyleSheet.create({
	centerText: {
		flex: 1,
		fontSize: 18,
		padding: 32,
		color: '#777'
	},
	textBold: {
		fontWeight: '500',
		color: '#000'
	},
	buttonText: {
		fontSize: 21,
		color: 'rgb(0,122,255)'
	},
	buttonTouchable: {
		padding: 16
	}
});

export default ScanScreen;
