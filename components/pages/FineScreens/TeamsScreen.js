import React from 'react';
import { StyleSheet, ActivityIndicator, FlatList, View, Text, Button} from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';


export default class TeamsFineScreen extends React.Component {

  static navigationOptions = {
    title: "Mine hold",

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
      joinedTeam: false,

    }  
  }

  //Kører getMyTeamsFromApiAsync() når siden indlæses
  componentDidMount() {
    this.getMyTeamsFromApiAsync();
  }

  getMyTeamsFromApiAsync(){

    //Henter den nuværende brugers ID ned
    var userId = firebase.auth().currentUser.uid;
    var that = this;

    //Henter alle bødekasser som brugeren er medlem af 
    return firebase.database().ref('users/' + userId + '/teams/').on('value', function (snapshot){
      var teams = snapshot.val()
      
        //Tjekker om brugeren er medlem af nogle bødekasser
        if(teams == undefined || null){
          //Hvis brugeren ikke er medlem af nogle bøde kasser, så sættes joinedteam til false
          that.setState({
            joinedTeam: false
          })

          // Hvis brugeren ER medlem, så sættes joinedTeam til true og bødekasserne sættes ind i dataSource
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
    //Hvis brugeren er medlem, så vises alle bødekasser som brugeren er medlem af
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
              chevronColor='#2c3e50'
              onPress={() => this.props.navigation.navigate('SpecificTeam', item)}
              containerStyle={{ backgroundColor: 'white' }}
            />
          }
          keyExtractor={(item, index) => index.toString()}
        />
        </View>
      );
        }

      //Hvis brugeren ikke er medlem 
      case false:{
      return(
        <View>
          <Text style={styles.text}>Du er desværre ikke tilmeldt nogle fælleskasser endnu</Text>
        </View>
      )
      }

    }  
  }
}


// styling af siden 
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    text: {
      fontSize: 16,
      width: '90%',
      marginLeft: '5%',
      marginBottom:'5%',
      marginTop: '5%'
   }
  })
