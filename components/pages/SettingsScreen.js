import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firebase from 'firebase';

export default class SettingsScreen extends React.Component {

  static navigationOptions = {
    title: "Indstillinger"
  };
  render() {
    return (
     
      <View style={styles.container}>
         <Text>Indstillinger</Text>
       <Button title="Log ud" onPress={() => firebase.auth().signOut()}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})