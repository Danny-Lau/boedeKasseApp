import React from 'react';
import { StyleSheet, ActivityIndicator, FlatList, View, Text, Button, Image } from 'react-native';
import { ListItem } from 'react-native-elements';


export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: "Min Profil"
  };

  render() {
    return (
      <View style={styles.container}>
         <Text>Min Profil</Text> 
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