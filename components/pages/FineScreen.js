import React from 'react';
import { StyleSheet, ActivityIndicator, FlatList, View, Text, Button, Image } from 'react-native';
import { ListItem } from 'react-native-elements';


export default class FineScreen extends React.Component {

  static navigationOptions = {
    title: "Mine Bøder"
  };

  render() {
    return (
      <View style={styles.container}>
         <Text>Mine Bøder</Text> 
      </View>
    );
  }
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    }
  })