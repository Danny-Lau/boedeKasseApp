import React from 'react';
import { StyleSheet, ActivityIndicator , Text, View } from 'react-native';
import LoginForm from './components/LoginForm';
import Navigations from './components/pages/Navigations';
import firebase from 'firebase';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null
    }
  }
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyBiGGnHLpHsqOl1Bbwao2-2r5MaBZKYkCU",
    authDomain: "examproject-46388.firebaseapp.com",
    databaseURL: "https://examproject-46388.firebaseio.com",
    projectId: "examproject-46388",
    storageBucket: "examproject-46388.appspot.com",
    messagingSenderId: "750184786065"
      });

    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  render() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={styles.container}>
            <Navigations/>
          </View>
        );
      case false:
        return (
          <View style={styles.container}>
          <LoginForm />
          </View>
        );
      default:
        return <ActivityIndicator size="large" />
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});