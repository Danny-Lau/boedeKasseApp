
import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, ActivityIndicator, FlatList, Button  } from 'react-native';
import firebase from 'firebase';
import { ListItem } from 'react-native-elements';

export default class SpecifikUserScreen extends React.Component {
  

  static navigationOptions = {
    title: 'Brugerens bøder',

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
    var {navigation} = this.props;
    var teamID = navigation.getParam('teamID', 'no teamID');
    var userID = firebase.auth().currentUser.uid;
    var that = this;

    return firebase.database().ref('teams/' + teamID + '/adminID').on('value', function (snapshot){
      var adminID = snapshot.val();

    

      if(adminID == userID) {
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
      const teamID = navigation.getParam('teamID', 'no teamID');
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
          const totalFine = navigation.getParam('totalFine', 'no totalFine');
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
                  <TouchableOpacity
                      style={styles.buttons}>
                        <Button 
                          onPress={() => {
                            this.props.navigation.navigate('GiveFine', {
                            teamID: teamID,
                            name: username,
                            totalFine: totalFine,
                            specificUserID: specificUserID
                          });
                          }}         
                          title="Tildel bøde"
                          color='white'
                      /> 
                  </TouchableOpacity>
                  />
                   
                  </View>
                )
                } case true: {
                  return (
           
                  <View>
                  {this.showFines()}

                        <TouchableOpacity
                          style={styles.buttons}>
                          <Button 
                            onPress={() => {
                              this.props.navigation.navigate('GiveFine', {
                              teamID: teamID,
                              name: username,
                              totalFine: totalFine,
                              specificUserID: specificUserID
                            });
                            }}         
                            title="Tildel bøde"
                            color='white'
                          /> 
                        </TouchableOpacity>
    
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
        <Text style={styles.text}> {username} er ikke blevet tildelt nogle bøder endnu!</Text>
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
            <Text style={styles.nameText}> {username} har fået bøder for:</Text>
            <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) =>
              <ListItem
                title={item.typeOfFines}
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                subtitleStyle={{ color: 'tomato' }}
                subtitle={item.fine + ' kr.'}    
                chevronColor='white'
                containerStyle={{ backgroundColor: 'white' }}
              />
            }
            keyExtractor={(item, index) => index.toString()}
          />
      
        
            <Text style={styles.fineText}>Total: 
            <Text style={styles.fineTotalText}> {fine} kr.</Text>   
            </Text>          
          </View>
      );
      } 
    }

    const styles = StyleSheet.create({
      buttons: {
        height: 45,
        width: 300,
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
   },
      nameText:{
        fontSize: 20,
        width: '90%',
        marginLeft: '5%',
        marginBottom:'5%',
        marginTop: '5%',
        fontWeight: 'bold',


    },
      fineText:{
        fontSize: 16,
        width: '90%',
        marginLeft: '5%',
        marginBottom:'5%',
        marginTop: '5%',
        fontWeight: 'bold',
   },

      fineTotalText:{
        fontSize: 16,
        width: '90%',
        marginLeft: '5%',
        marginBottom:'5%',
        marginTop: '5%',
        fontWeight: 'bold',
        color: 'tomato',
        textDecorationLine: 'underline'
    },
  })
  
    


