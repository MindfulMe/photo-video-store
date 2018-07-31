import React, { Component } from 'react';
import { WebView } from 'react-native';
import PushNotifications from './PushNotifications';
class About extends Component {
  render() {
    return (
      <WebView
        source={{ uri: 'https://ecobabybarcelona5d.com/' }}
        scalesPageToFit={false}
        bounces={true}
        scrollEnabled={true}
      />
    );
  }
}
export default About;
