import React from 'react';
import { StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, View, Text, Button  } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';


export default class AdminFineScreen extends React.Component {

  static navigationOptions = {
    title: "Administrere",
     
    //Styler headeren på siden
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

  //Kører getMyOwnTeams funktionen når siden bliver indlæst
  componentDidMount(){
    this.getMyOwnTeams();
  }
   
  
  getMyOwnTeams(){

    //Henter den nuværende brugers ID ned
    var userId = firebase.auth().currentUser.uid;
    var that = this;

    //Databasekald som henter alle bødekasser ned, som brugeren har oprettet
    return firebase.database().ref('users/' + userId + '/adminTeams').on('value', function (snapshot){
      var myTeams = snapshot.val()
      
        /*Hvis der returneres null eller undefined (Har ikke oprettet nogle bødekasser)
          så sætte isAdmin til false
        */
        if(myTeams == undefined || null){
          that.setState({
            isAdmin: false
          })

          /* Hvis brugeren HAR oprettet minimum en bødekasse, så sættes isAdmin til true
            og alle hold sættes ind i dataSource
          */
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

    //Viser forskellige skærme alt efter om brugeren har oprettet nogle bødekasser
    switch(this.state.isAdmin){
      /* Hvis brugeren har oprettet bødekasser, så vises de alle sammen i en FlatList.
         Derudover er der henholdsvis en knap til at joine en bødekasse eller oprette et 
         ny bødekasse
      */ 
      case true: {
        return (
          <View style={styles.container}>
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
    
              
              <TouchableOpacity
              style={styles.buttons}>
              <Button 
                onPress={() => this.props.navigation.navigate('CreateTeam')}            
                title="Opret ny fælleskasse"
                color='white'
              /> 
              </TouchableOpacity> 

              <TouchableOpacity
                style={styles.buttons}>
                <Button 
                  onPress= {() => this.props.navigation.navigate('JoinTeam')}         
                  title="Join fælleskase"
                  color='white'
                /> 
              </TouchableOpacity>

          </View>
        );
      }
      /*Hvis brugeren ikke har oprette nogle bødekasser, så vises der en besked
        Derudover er der henholdsvis en knap til at joine en bødekasse eller oprette et 
        ny bødekasse
      */
      case false: {
        return (
          <View>
          <Text style={styles.text}>Du har ikke oprette nogle bøderkasser endnu. 
          Du kan derfor ikke administrere nogle bødekasser  </Text>
         
            <TouchableOpacity
              style={styles.buttons}>
              <Button 
                onPress={() => this.props.navigation.navigate('CreateTeam')}            
                title="Opret ny fælleskasse"
                color='white'
              /> 
          </TouchableOpacity> 

          <TouchableOpacity
              style={styles.buttons}>
              <Button 
                onPress= {() => this.props.navigation.navigate('JoinTeam')}         
                title="Join fælleskasse"
                color='white'
              /> 
          </TouchableOpacity>
        </View>
        )
      }
    }  
  }  
}

  //Styling af siden
  const styles = StyleSheet.create({

    buttons: {
      height: 45,
      width: 300,
      backgroundColor: '#2980b6',
      marginBottom: '3%',
      marginLeft: '10%',
      marginTop: '5%'
   },

    text: {
      fontSize: 16,
      width: '90%',
      marginLeft: '5%',
      marginBottom:'5%',
      marginTop: '5%'
   }
  })