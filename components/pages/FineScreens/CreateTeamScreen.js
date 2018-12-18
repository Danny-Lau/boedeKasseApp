import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import firebase from 'firebase';


export default class CreateTeamScreen extends React.Component {

  static navigationOptions = {
    title: "Opret bødekasse",

    //Styling af headeren på siden
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
        members: '', 
        teamName: '',
        error:'',
    }
  }

  ////Kører denne funktion når brugeren trykker på knappen "Tilmeld"
  executefunction(){
    this.createTeam();
    this.props.navigation.navigate('AdminFine');
  }

  createTeam(){
      const userId = firebase.auth().currentUser.uid;
      const teamName = this.state.teamName;
      const members = this.state.members;

      //Henter brugerens username
      return firebase.database().ref('users/' + userId + '/username').once('value', function (snapshot){
        const username  = snapshot.val();

      //Henter brugerens mail
      return firebase.database().ref('users/' + userId + '/email').once('value', function (snapshot){
        const mail  = snapshot.val();

      //Opretter ny bødekasse i databasen
      firebase.database().ref('teams/').push({
          members: members,
          name: teamName,
          adminID: userId,
          teamID: 1

      
      //Henter det autogenreret teamID 
      //https://stackoverflow.com/questions/16637035/in-firebase-when-using-push-how-do-i-pull-the-unique-id
      }).then((snap) => {
        const key = snap.key 

        //Tilføjer teamID under teamet
        firebase.database().ref('teams/' + key).update({
          teamID: key
        })

        //Tilføjer bødekassen til bruger id´et        
        firebase.database().ref('users/' + userId + '/teams').push({
          name: teamName,
          teamID: key,
          
        }).then((data)=>{
          
          

          //Tilføjer brugeren til bødekassen
          firebase.database().ref().child('teams/' + key + '/members').child(userId).set({
            name: username,
            totalFine: 0,
            userID: userId,
            email: mail,
            teamID: key
          
          }).then((data) => {


            //Oprette brugeren som Admin
            firebase.database().ref('users/' + userId + '/adminTeams').push({
              name: teamName,
              teamID: key,
            })
            alert('Dit hold blev oprettet');

              
          
          }).catch((error) => {
            console.log('error ' , error )
          })
        
        }).catch((error) => {
            console.log('error ' , error )
        })

      }).catch((error) => {
        console.log('error ' , error )
    })    
  })
})
}


  render() {
      // viser en inputbox, hvor brugeren indtaster navnet til bødekassen
       return (
        <View style={styles.container}>
            <Text style={styles.teamContent}>Indtast navnet på fælleskassen </Text>
                <TextInput 
                    style={styles.inputBox}
                  placeholder='Holdnavn'
                  placeholderTextColor='lightgrey'
                  value={this.state.teamName}
                  onChangeText={teamName => this.setState({ teamName })}
                />
       
                <TouchableOpacity
                    style={styles.buttons}>
                    <Button 
                    onPress={this.executefunction.bind(this) }
                    title="Opret bødekasse"
                    color='white'
                    /> 
                </TouchableOpacity>
        
        </View>
    );
  }
}
//Styling af siden
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    teamContent: {
      fontSize: 20,
      fontWeight: 'bold',
    },

    inputBox: {
      borderWidth: 2,
      borderColor: '#4d4d4d',
      height: '5%',
      width: '60%',
      marginBottom: '3%',
      marginTop: '5%',
      textAlign: 'center'

    },
    buttons: {
      borderColor: 'lightgrey',
      height: '7%',
      width: '60%',
      backgroundColor: '#2980b6',
      marginTop: '3%',

   },


  });
  