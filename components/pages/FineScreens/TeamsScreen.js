import React from 'react';
import { StyleSheet, ActivityIndicator, FlatList, View, Text, Button} from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';


export default class TeamsFineScreen extends React.Component {

  static navigationOptions = {
    title: "Mine hold"
  };

  constructor(props) {
    super(props);
    this.state = {
      isloading: true,
      joinedTeam: false,

    }  
  }

  componentDidMount() {
    this.getMyTeamsFromApiAsync();
  }

  getMyTeamsFromApiAsync(){
    var userId = firebase.auth().currentUser.uid;

    var that = this;

    return firebase.database().ref('users/' + userId + '/teams/').on('value', function (snapshot){
      teams = snapshot.val()
      
        if(teams == undefined || null){
          that.setState({
            joinedTeam: false
          })

        } else {
          teams = Object.values(snapshot.val());
          that.setState({
            isLoading: false,
            dataSource: teams,
            joinedTeam: true,
  
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
    switch (this.state.joinedTeam) {
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
        </View>
      );
        }

      case false:{
      return(
        <View>
          <Text>Du er desværre ikke tilmeldt nogle bødekasser endnu</Text>
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
    },


  })