import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator, FlatList, Button } from 'react-native';
import firebase from 'firebase';
import { ListItem } from 'react-native-elements';

export default class SpecificTeamFineScreen extends React.Component {

    static navigationOptions = {
        title: 'Bøder for holdet', 

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
          isloading: true,
          isAdmin: false
    
        }  
      }
      //Kører denne funktionen når siden indlæses
      componentDidMount() {
        this.ShowSpecificTeam();
      }
    

      ShowSpecificTeam(){
          var {navigation}  = this.props;
          var teamID = navigation.getParam('teamID');
          var that = this;
          
          //Databasekald som henter den specifikke bødekasses medlemmer ned
          return firebase.database().ref('teams/' + teamID + '/members/').on('value', function (snapshot){
            var members = Object.values(snapshot.val());

            //Sætter members ind i datasource
            that.setState({
                isLoading: false,
                dataSource: members,
              });
            }); 

      }

    
            
      // Viser bødekassens medlemmer i en FlatList
      render() {
        if (this.state.isLoading) {
          return (
            <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'stretch' }}>
              <ActivityIndicator size='large' />
            </View>     
          )
        }
            return (
              <View>
              {this.showData()}
              </View>
            );
        }

        

      //funktioen som bliver kaldt i render (skal vise medlemmerne i bødekassen)
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
                title={item.name +'  ' + '(' + item.email + ')' } 
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                subtitleStyle={{ color: 'tomato' }}
                subtitle={item.totalFine + ' kr. ' }  
                chevronColor='#2c3e50'
                onPress={() => this.props.navigation.navigate('SpecificUser', item )}
             
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