import React, {Component} from 'react';
import { WebView } from 'react-native-webview';
import { Text } from 'react-native';
export default class ViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yuerel: this.props.navigation.state.params.yuerel,
    };
  }
  render() {
    //console.log("yuerel: " + this.state.yuerel)
    return (
      //<Text>{this.state.yuerel}</Text>
      <WebView
        source={{ uri: this.state.yuerel }}
        style={{marginTop: 0}}
      />
    );
  }
}