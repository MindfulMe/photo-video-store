import React, { Component } from 'react';
import { WebView } from 'react-native';

class MyWeb extends Component {
  render() {
    return (
      <WebView
        source={{ uri: 'https://client-panel-s.herokuapp.com/' }}
        scalesPageToFit={false}
        bounces={true}
        scrollEnabled={true}
        injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
scalesPageToFit={false}
      />
    );
  }
}
export default MyWeb;
