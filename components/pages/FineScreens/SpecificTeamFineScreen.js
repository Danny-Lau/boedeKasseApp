import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator, FlatList, Button } from 'react-native';
import firebase from 'firebase';
import { ListItem } from 'react-native-elements';

export default class SpecificTeamFineScreen extends React.Component {

    static navigationOptions = {
        title: 'Bøder for holdet' 
      };

      constructor(props) {
        super(props);
        this.state = {
          isloading: true,
          isAdmin: false
    
        }  
      }

      componentDidMount() {
        this.ShowSpecificTeam();
      }
    

      ShowSpecificTeam(){
          var {navigation}  = this.props;
          var teamID = navigation.getParam('teamID');
          var userId = firebase.auth().currentUser.uid;
          var that = this;

          return firebase.database().ref('teams/' + teamID + '/adminID/').on('value', function (snapshot){
            var adminID = snapshot.val();
            
            if(adminID === userId){
            that.setState({
              isAdmin: true,
            });   
          } else {
            that.setState({
              isAdmin: false,
            });
          }

          return firebase.database().ref('teams/' + teamID + '/members/').on('value', function (snapshot){
            var members = Object.values(snapshot.val());

            that.setState({
                isLoading: false,
                dataSource: members,
              });
            }); 
          })
      
      }
    
      render() {
        if (this.state.isLoading) {
          return (
            <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'stretch' }}>
              <ActivityIndicator size='large' />
            </View>     
          )
        }
        switch (this.state.isAdmin){
          case false: {
            return (
              <View>
              {this.showData()}
              </View>
            );
          }

          case true: {
            return (
              <View>
                {this.showData()}
                <Button title='Tildel bøde' onPress= {() => this.props.navigation.navigate('CreateTeam')}/>
                <Button title='Tilføj medlemmer' onPress= {() => this.props.navigation.navigate('CreateTeam')}/>
              </View>
            )
          }
        }
      }
      
      showData(){
        if(this.state.loading) {
          return <ActivityIndicator size='small' />
        }  
        return (
          <View>
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) =>
              <ListItem
                title={item.name}
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                subtitleStyle={{ color: 'tomato' }}
                subtitle={item.fine}    
                chevronColor='tomato'
                onPress={() => this.props.navigation.navigate('SpecificUser', item)}
                containerStyle={{ backgroundColor: 'white' }}
              />
            }
            keyExtractor={(item, index) => index.toString()}
          />
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
    
    
      })