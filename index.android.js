/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React , { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  Dimensions,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Camera from 'react-native-camera';
import Location from './app/Location';

class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>

<Text>Hello, React-Native App</Text>

        <Button style={padding=20}
          onPress={() => navigate('cameraApp')}
          title="Barcode Scanner"
        />

        
        <Button style={margin=20}
          onPress={() => navigate('Location')}
          title="Show Location in Map"
        />
        
        
      </View>
    );
  }
}

class LocationScreen extends React.Component {
  static navigationOptions = {
    title: 'Show Location',
  };
  render() {
    return (
      <Location />
    );
  }
}


class cameraApp extends Component {
  static navigationOptions = {
    title: 'Barcode Scanner',
  };
  constructor(props){
    super();
    this.state={
      type:'',
      data:''
    }
    this.update = this.update.bind(this)
  }

 
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}> 
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          onBarCodeRead={(code) => this.update(code)}
          playSoundOnCapture ={false}
          autoFocus = {true}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <View style={styles.rectangleContainer}>
            <Text style={styles.barcodeResult}> {this.state.type} : {this.state.data}</Text> 
              <View style={styles.rectangle} />
          </View>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }

 update(code1) {
    const { navigate } = this.props.navigation; 
    console.log(code1)
    this.setState({ data: code1.data, type: code1.type });
    navigate('HomeScreen');
  }

  takePicture() {
    console.log('Taked');
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent'
  },
  barcodeResult:{
    color: 'red'
  }
});


const NavigatorTest = StackNavigator({
 Home: { screen: HomeScreen },
 Location: { screen: LocationScreen },
 cameraApp: {screen: cameraApp},
});

AppRegistry.registerComponent('NavigatorTest', () => NavigatorTest);