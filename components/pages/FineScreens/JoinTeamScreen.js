import React from 'react';
import { StyleSheet, ActivityIndicator, FlatList, View, Text, Button} from 'react-native';
import { ListItem, List, SearchBar } from 'react-native-elements';
import firebase from 'firebase';

export default class AddMembersScreen extends React.Component {

    static navigationOptions = {
        title: "Vælg hold"
    };

    constructor(props) {
        super(props);
        this.state= {
            isloading: true,
            error: null,
    }
}

componentDidMount(){

    this.getTeams();

  }

//Henter alle hold ned
getTeams() {
    var that = this; 

    return firebase.database().ref('teams').on('value', function (snapshot){
        var teams = Object.values(snapshot.val());

        that.setState({
            dataSource: teams,
            isloading: false,
        })
    });
}





render(){


    if(this.state.isloading) {
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
                  onPress={() => this.props.navigation.navigate('Confirm', item)}
                  containerStyle={{ backgroundColor: 'white' }}
                />
              }
              keyExtractor={(item, index) => index.toString()}
            />
            </View>
          );
            }
    }
    
