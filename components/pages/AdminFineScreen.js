import React from 'react';
import { StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, View, Text, Button  } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';


export default class AdminFineScreen extends React.Component {

  static navigationOptions = {
    title: "Administrere",

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
                title="Opret ny bødekasse"
                color='white'
              /> 
              </TouchableOpacity> 

              <TouchableOpacity
                style={styles.buttons}>
                <Button 
                  onPress= {() => this.props.navigation.navigate('JoinTeam')}         
                  title="Join bødekasse"
                  color='white'
                /> 
              </TouchableOpacity>

          </View>
        );
      }

      case false: {
        return (
          <View>
          <Text style={styles.text}>Du har ikke oprette nogle bøderkasser endnu. 
          Du kan derfor ikke administrere nogle bødekasser  </Text>
         
            <TouchableOpacity
              style={styles.buttons}>
              <Button 
                onPress={() => this.props.navigation.navigate('CreateTeam')}            
                title="Opret ny bødekasse"
                color='white'
              /> 
          </TouchableOpacity> 

          <TouchableOpacity
              style={styles.buttons}>
              <Button 
                onPress= {() => this.props.navigation.navigate('JoinTeam')}         
                title="Join bødekasse"
                color='white'
              /> 
          </TouchableOpacity>
        </View>
        )
      }
    }
    
      
    }  

}
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