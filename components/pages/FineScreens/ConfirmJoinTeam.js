import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Button, } from 'react-native';
import firebase from 'firebase';


export default class ConfirmJoinTeam extends React.Component {

  static navigationOptions = {
    title: "Bekræftelse",

    // styling af headeren på siden
    headerStyle: {
      backgroundColor: '#2c3e50'
     },

     headerTitleStyle: {
      color: 'rgba(225,225,225,0.7)'
   },
  };

  constructor(props) {
    super(props);
    this.state = {
    error:'',
}
  }
//Kører denne funktion når brugeren trykker på knappen "Tilmeld"
executefunction(){
  this.onButtonPress();
  this.props.navigation.navigate('JoinTeam');
}

onButtonPress(){
  const {navigation} = this.props;
  const teamName = navigation.getParam('name', 'No name');
  const teamID = navigation.getParam('teamID', 'No team ID');
  const userId = firebase.auth().currentUser.uid;

  //Henter Brugerens mail
  return firebase.database().ref('users/' + userId + '/email').once('value', function (snapshot){
    const mail = snapshot.val();
  
  //Databasekald til at tjekke om brugeren er tilmeldt bødekasseni forevejen 
  return firebase.database().ref('users/' + userId + '/teams/' + teamID).once('value', function(snapshot){
      const  checkingObject = snapshot.val();


       if (checkingObject == undefined || null){
        //Henter brugernavnet ned
        return firebase.database().ref('users/' + userId + '/username').once('value', function (snapshot){
          const username = snapshot.val()
     
          //Tilføjer brugeren til teamet i Firebase
          firebase.database().ref().child('teams/' + teamID + '/members').child(userId).set({
              totalFine: 0,
              name: username,
              email: mail,
              userID: userId, 
              teamID: teamID
            }).then((data)=>{
                 
                //Tilføjer teamet til brugeren i Firebase
                firebase.database().ref().child('users/' + userId + '/teams').child(teamID).set({
                    name: teamName,
                    teamID: teamID
                })
    
                alert('Du er nu tilmeldt bødekassen ' + teamName)
            })  
        });  
      } else {
        //Hvis brugeren er tilmeldt bødekassen så visses denn besked
        alert('Du er allerede tilmeldt denne bødekassen')
      }
  })
})
}

  render() {
    
    const {navigation} = this.props;
    const name = navigation.getParam('name', 'No name');
        //Spørger om bruger er sikker på at tilmelde sig bødekasen. Dette kan bekræftes ved at brugen trykker "Tilmeld"
        return (
            <View>
              <Text style={styles.text}>Er du sikker på, at du vil tilmelde dig bødekassen "{name}"?</Text>
              
              <TouchableOpacity
              style={styles.buttons}>
              <Button 
                onPress={this.executefunction.bind(this)}           
                title="Tilmeld"
                color='white'
              /> 
             </TouchableOpacity> 
            </View>
        );

  }
}

//Styling af siden
const styles = StyleSheet.create({

  buttons: {
    borderColor: 'lightgrey',
    height: '20%',
    width: '80%',
    backgroundColor: '#2980b6',
    marginBottom: '3%',
    marginLeft: '10%',
 },

  text: {
    fontSize: 16,
    width: '90%',
    marginLeft: '5%',
    marginBottom:'5%',
    marginTop: '5%'
 }
})