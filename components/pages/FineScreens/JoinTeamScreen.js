import React from 'react';
import { StyleSheet, ActivityIndicator, FlatList, View, Text, Button} from 'react-native';
import { ListItem, List, SearchBar } from 'react-native-elements';
import firebase from 'firebase';

export default class AddMembersScreen extends React.Component {

    static navigationOptions = {
        title: "Vælg hold",

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
        this.state= {
            isloading: true,
            error: null,
    }
}
//Kører denne funktion når siden indlæses
componentDidMount(){
    this.getTeams();
  }

//Henter alle hold ned
getTeams() {
    var that = this; 

    //Databasekald som henter alle bødekasserne ned
    return firebase.database().ref('teams').on('value', function (snapshot){
        var teams = Object.values(snapshot.val());

        that.setState({
            //Sætter teams ind i dataSource
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
        //Viser alle hold i en FlatList
        return (
            <View>    
            <FlatList
              data={this.state.dataSource}
              renderItem={({ item }) =>
                <ListItem
                  title={item.name}
                  titleStyle={{ color: 'black', fontWeight: 'bold' }}
                  chevronColor='#2c3e50'
                  onPress={() => this.props.navigation.navigate('Confirm', item, )}
                  containerStyle={{ backgroundColor: 'white' }}
                />
              }
              keyExtractor={(item, index) => index.toString()}
            />
            </View>
          );
            }
    }
    