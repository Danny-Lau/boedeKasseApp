import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
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
   
          
          
        }  
      }

      componentDidMount() {
        this.ShowSpecificTeam();
      }
    

      ShowSpecificTeam(){
          const {navigation}  = this.props;
          const teamID = navigation.getParam('teamID');
       
   
          var that = this;
          return firebase.database().ref('teams/' + teamID + '/members/').on('value', function (snapshot){
            var members = Object.values(snapshot.val());

            that.setState({
                isLoading: false,
                dataSource: members,
              });
            });
      
          
        
      }
    
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
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) =>
              <ListItem
                title={item.name}
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                subtitleStyle={{ color: 'tomato' }}
                subtitle={item.fine}    
                chevronColor='tomato'
                onPress={() => this.props.navigation.navigate('SpecificTeam', item)}
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