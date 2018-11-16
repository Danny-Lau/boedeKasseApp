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
      isLoading: true
    }
  }

  componentDidMount(){
    this.registerUserInfo();

  }
 
  registerUserInfo() {
    var userId = firebase.auth().currentUser.uid;
    var username = this.state.username;
    var mail = firebase.auth().currentUser.email;

    firebase.database().ref().child('users').child(userId).push({
      username: username,
      email: mail
    })
  }



  render() {     
          return (
            <View>
            <Text>Hej</Text>
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