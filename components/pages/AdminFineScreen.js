import React from 'react';
import { StyleSheet, ActivityIndicator, FlatList, View, Text, Button, Image } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';

export default class AdminFineScreen extends React.Component {

  static navigationOptions = {
    title: "Administrere"
  };

  constructor(props) {
    super(props);
    this.state = {
      isloading: true,
      isAdmin: false
    }  
  }

  componentDidMount(){
    this.getMyOwnTeams();
  }
   
  
  getMyOwnTeams(){

    var userId = firebase.auth().currentUser.uid;
    var that = this;

    return firebase.database().ref('users/' + userId + '/adminTeams').on('value', function (snapshot){
      var myTeams = snapshot.val()
      
        if(myTeams == undefined || null){
          that.setState({
            isAdmin: false
          })

        } else {
          myTeams = Object.values(snapshot.val());
          that.setState({
            isLoading: false,
            dataSource: myTeams,
            isAdmin: true,
  
          });
        }
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

    switch(this.state.isAdmin){
      case true: {
        return (
          <View>
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) =>
              <ListItem
                title={item.name}
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                chevronColor='tomato'
                onPress={() => this.props.navigation.navigate('SpecificTeam', item)}
                containerStyle={{ backgroundColor: 'white' }}
              />
            }
            keyExtractor={(item, index) => index.toString()}
          />
    
          <Button title='Opret nyt hold' onPress= {() => this.props.navigation.navigate('CreateTeam')}/>
          </View>
        );
      }

      case false: {
        return (
          <View>
          <Text>Du har ikke oprette nogle bøderkasser endnu. </Text>
          <Text>Du kan derfor ikke administrere nogle bødekasser </Text>
          <Button title='Opret nyt hold' onPress= {() => this.props.navigation.navigate('CreateTeam')}/>
        </View>
        )
      }
    }
    
      
    }  
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  })