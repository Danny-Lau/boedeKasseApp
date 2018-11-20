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

  createTeam(){
      const userId = firebase.auth().currentUser.uid;
      const teamName = this.state.teamName;
      const members = this.state.members;

      firebase.database().ref('teams/').push({
          members: members,
          name: teamName,
          adminID: userId 
      }).then((data) => {
          alert('Dit hold blev oprettet');
          this.props.navigation.navigate('AdminFine')
      }).catch((error) => {
          console.log('error ' , error )
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
                <Button title='Opret mit hold' onPress={this.createTeam.bind(this) }></Button>
        
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
  