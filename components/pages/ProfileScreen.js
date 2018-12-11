import React from 'react';
import { StyleSheet, TouchableOpacity,View, Button} from 'react-native';
import { ListItem, ListView} from 'react-native-elements';
import firebase from 'firebase';


export default class ProfileScreen extends React.Component {
  

  static navigationOptions = {
    title: "Min Profil",

    headerStyle: {
      backgroundColor: '#2c3e50'
     },

     headerTitleStyle: {
      color: 'rgba(225,225,225,0.7)'
   },
    
  };
  



  render() {   

    return(
      <View style={styles.container}>
        <TouchableOpacity
              style={styles.buttons}>
              <Button 
                onPress={() => firebase.auth().signOut()}        
                title="Log ud"
                color='white'
              /> 
          </TouchableOpacity>
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
},

buttons: {
  borderColor: 'lightgrey',
  height: '7%',
  width: '60%',
  backgroundColor: '#2980b6',
  marginBottom: '3%',

}
})