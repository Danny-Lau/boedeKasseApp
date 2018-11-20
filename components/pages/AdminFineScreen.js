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
      isloading: true
    }  
  }

  componentDidMount(){
    this.getMyOwnTeams();
  }
   
  
  getMyOwnTeams(){
    var userId = firebase.auth().currentUser.uid;
    var that = this;

    return firebase.database().ref('teams/').on('value',function(snapshot){
      var myTeams = snapshot.child('adminID').val();

      if (myTeams != userId){
        return(
          <View>
            <Text>Du har ikke oprettet nogle bødekasser endnu!</Text>
          </View>
        )
      }

      that.setState({
        isloading:false,
        datasource: myTeams
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
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  })