import React from 'react';
import { StyleSheet, ActivityIndicator, TextInput, View, Text, Button} from 'react-native';
import { ListItem, ListView} from 'react-native-elements';
import firebase from 'firebase';


export default class ProfileScreen extends React.Component {
  

  static navigationOptions = {
    title: "Min Profil"
  };
  



  render() {   

    return(
      <View style={styles.container}>
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