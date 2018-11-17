import React from 'react';
import { StyleSheet, ActivityIndicator, TextInput, View, Text, Button} from 'react-native';
import { ListItem, ListView} from 'react-native-elements';
import firebase from 'firebase';


export default class ProfileScreen extends React.Component {
  

  static navigationOptions = {
    title: "Min Profil"
  };
  constructor(props) {
    super(props);
    this.state ={
      username:'',
      mail:'',
      isLoading: true
    }
  }

 
 
 
  showUserPofile() {
    var userId = firebase.auth().currentUser.uid;

    firebase.database().ref('users/' + userId).on('value', (snapshot) => {
      const user = snapshot.val();
      this.mail = user.email;
       
      

    })
  }



  render() {   
    this.showUserPofile()
    const mail = mail
    return(
      <View>
      <Text>mailen er: {mail}</Text>
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