import React, { Component } from 'react';

import {
	StyleSheet,
	Text,
} from 'react-native';

export default class HasilScanScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: this.props.navigation.state.params.text,
		};
	}
	render() {
		return (
			<Text style={styles.centerText}>{this.state.text}</Text>
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