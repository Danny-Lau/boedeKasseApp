import React from 'react';
import { StyleSheet, View, Text, Button, } from 'react-native';
import firebase from 'firebase';


export default class ConfirmJoinTeam extends React.Component {

  static navigationOptions = {
    title: "Bekræftelse"
  };

  constructor(props) {
    super(props);
    this.state = {
    error:'',
}
  }

executefunction(){
  this.onButtonPress();
  this.props.navigation.navigate('JoinTeam');
}

onButtonPress(){
  const {navigation} = this.props;
  const teamName = navigation.getParam('name', 'No name');
  const teamID = navigation.getParam('teamID', 'No team ID');
  const userId = firebase.auth().currentUser.uid;
    
  return firebase.database().ref('users/' + userId + '/teams/' + teamID).once('value', function(snapshot){
      var  checkingObject = snapshot.val();

       if (checkingObject == undefined || null){
        //Henter brugernavnet ned
        return firebase.database().ref('users/' + userId + '/username').on('value', function (snapshot){
          var username = snapshot.val()
     
          //Tilføjer brugeren til teamet i Firebase
          firebase.database().ref('teams/' + teamID + '/members').push({
              fine: 0,
              name: username,
            }).then((data)=>{
                 
                //Tilføjer teamet til brugeren i Firebase
                firebase.database().ref().child('users/' + userId + '/teams').child(teamID).set({
                    name: teamName,
                    teamID: teamID
                })
    
                alert('Du er nu tilmeldt bødekassen' + teamName)
            })  
        });  
      } else {
        alert('Du er allerede tilmeldt denne bødekassen')
      }
  })
}

  render() {
    
    const {navigation} = this.props;
    const name = navigation.getParam('name', 'No name');
    
        return (
            <View>
              <Text>Er du sikker på, at du vil tilmelde dig bødekassen {name}?</Text>
              
              {this.renderButton()}
            </View>
        );

  }

renderButton() {
    return (
      <Button title="Tilmeld" onPress={this.executefunction.bind(this)}>
      </Button>
    );
  }
}