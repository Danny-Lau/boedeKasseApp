import React from 'react';
import {View, Text, StyleSheet, TextInput, Button } from 'react-native';
import firebase from 'firebase';


export default class CreateTeamScreen extends React.Component {

  static navigationOptions = {
    title: "Opret nyt hold"
  };

  constructor(props) {
    super(props);
    this.state = {
        members: '', 
        teamName: '',
        error:'',
    }
  }

  executefunction(){
    this.createTeam();
    this.props.navigation.navigate('AdminFine');
  }

  createTeam(){
      const userId = firebase.auth().currentUser.uid;
      const teamName = this.state.teamName;
      const members = this.state.members;

      //Henter brugerens username
      return firebase.database().ref('users/' + userId + '/username').on('value', function (snapshot){
        var username  = snapshot.val();




      //Opretter ny bødekasse i databasen
      firebase.database().ref('teams/').push({
          members: members,
          name: teamName,
          adminID: userId,
          teamID: 1

      
      //Henter de autogenreret teamID 
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
          firebase.database().ref('teams/' + key + '/members').push({
            name: username,
            fine: 0,
          
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
}


  render() {
       return (
        <View style={styles.container}>
            <Text style={styles.loginContent}>Indtast holdnavn</Text>
                <TextInput 
                    style={styles.inputBox}
                  placeholder='Holdnavn'
                  value={this.state.teamName}
                  onChangeText={teamName => this.setState({ teamName })}
                />
                <Button title='Opret mit hold' onPress={this.executefunction.bind(this) }></Button>
        
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

    loginContent: {
      fontSize: 20,
    },

    inputBox: {
        borderWidth: 2,
        borderColor: 'lightgrey',
        height: 30,
        width: 150,
        marginBottom: 20,
        marginTop: 15,


    }


  });
  