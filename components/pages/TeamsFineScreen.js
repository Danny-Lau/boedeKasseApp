import React from 'react';
import { StyleSheet, ActivityIndicator, FlatList, View, Text, Button, Image } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';


export default class TeamsFineScreen extends React.Component {

  static navigationOptions = {
    title: "Følgender personer skylder:"
  };

  constructor(props) {
    super(props);
    this.state = {
      isloading: true
    }  
  }

  componentDidMount() {
    this.getUsersFineFromApiAsync();

  }

  getUsersFineFromApiAsync(){

    var that = this;

    return firebase.database().ref('Players').on('value', function (snapshot){
      var players = Object.values(snapshot.val());

      that.setState({
        isLoading: false,
        dataSource: players,
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
            title={item.Name}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            subtitleStyle={{ color: 'tomato' }}
            subtitle={item.currentFine}
            chevronColor='tomato'
            onPress={() => this.props.navigation.navigate('Profile', item)}
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