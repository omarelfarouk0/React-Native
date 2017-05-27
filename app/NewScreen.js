import React , { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';

export default class NewScreen extends Component {
  render() {
    return (
      <View>
        <Text>New Screen View!</Text>
      </View>
    );
  }
}
AppRegistry.registerComponent('NewScreen', () => NewScreen);