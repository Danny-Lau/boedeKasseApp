
import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';
import { ListItem } from 'react-native-elements';

export default class SpecifikUserScreen extends React.Component {
  

  static navigationOptions = {
    title: 'Brugerens bøder'
  };
  constructor(props) {
    super(props);
    this.state = {
      isloading: true,
      isAdmin: false,
      existingFines: false,
    }  
  }

  componentDidMount(){
    this.CheckAdmin();
    this.CheckExistingFines();
  }

  CheckAdmin(){
    const {navigation} = this.props;
    const teamID = navigation.getParam('teamID', 'no ID');
    const userID = firebase.auth().currentUser.uid;
    var that = this;

    return firebase.database().ref('teams/' + teamID + '/adminID').once('value', function(snapshot){
      var adminID = snapshot.val();
    

      if(adminID === userID) {
        that.setState({
          isAdmin: true,
        }); 
        } else {
          that.setState({
            isAdmin: false,
          });
          
        }
      }) 
    
      }

    CheckExistingFines() {
      const {navigation} = this.props;
      const specificUserID  = navigation.getParam('userID', 'no Id');
      const teamID = navigation.getParam('teamID', 'no fine');
      var that = this;
      
        //Tjekker om brugeren har fået tildelt bøder indtil videre
        return firebase.database().ref ('teams/' + teamID + '/members/' + specificUserID + '/fines').on('value', function(snapshot){
          var fines = snapshot.val();
   
          if(fines == undefined || null) {
            that.setState({
              existingFines: false,
            }); 
          } else {
            var fines = Object.values(snapshot.val());
            that.setState({
              isLoading: false,
              existingFines: true,
              dataSource: fines,
            });
          }
        });
      }
   
  
      render() {
        const {navigation} = this.props;
          const username = navigation.getParam('name', 'No username');
          const fine = navigation.getParam('totalFine', 'no fine');
          const teamID = navigation.getParam('teamID', 'no teamID');
          const specificUserID  = navigation.getParam('userID', 'no Id');
    
        if (this.state.isLoading) {
          return (
            <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'stretch' }}>
              <ActivityIndicator size='large' />
            </View>     
          )
        }
    
        switch (this.state.isAdmin){
          case false: {
            switch(this.state.existingFines){
              case false: {
                return(
                  <View>
                  {this.showMessage()}
                  </View>
                )
                } case true: {
                  return(
                  <View>
                  {this.showFines()}
                  </View>
                  )}
            }
          } case true: {
            switch(this.state.existingFines){
              case false: {
                return(
                  <View>
                  {this.showMessage()}
                  <Button 
                    title='Tildel bøde' 
                    onPress={() => {
                    this.props.navigation.navigate('GiveFine', {
                    teamID: teamID,
                    username: username,
                    totalFine: fine,
                    specificUserID: specificUserID
                  });
                  }}
                  />
                   
                  </View>
                )
                } case true: {
                  return (
           
                  <View>
                  {this.showFines()}
                  <Button 
                    title='Tildel bøde' 
                    onPress={() => {
                    this.props.navigation.navigate('GiveFine', {
                    teamID: teamID,
                    name: username,
                    fine: fine,
                    specificUserID: specificUserID
                    
                  });
                  }}
                  />
                  </View>
                  )
                }
            }
          }
        }
      
      }
    
  showMessage(){
    const {navigation} = this.props;
    const username = navigation.getParam('name', 'No username');


    if(this.state.loading) {
      return <ActivityIndicator size='small' />
    }
    return (
      <View>
        <Text> {username} er ikke blevet tildelt nogle bøder endnu</Text>
      </View>
    )
  }
    showFines(){
      const {navigation} = this.props;
      const username = navigation.getParam('name', 'No username');
      const fine = navigation.getParam('totalFine', 'no fine');


      if(this.state.loading) {
        return <ActivityIndicator size='small' />
      }
        return (
          <View>
            <Text> {username}</Text>
            <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) =>
              <ListItem
                title={item.typeOfFines}
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                subtitleStyle={{ color: 'tomato' }}
                subtitle={item.fine}    
                chevronColor='tomato'
                containerStyle={{ backgroundColor: 'white' }}
              />
            }
            keyExtractor={(item, index) => index.toString()}
          />
      
        
            <Text>Total: {fine}</Text>           
          </View>
      );
      } 
    }
  
    


