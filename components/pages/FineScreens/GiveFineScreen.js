import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import firebase from 'firebase';


export default class GiveFineScreen extends React.Component {

  static navigationOptions = {
    title: "Giv bøde",

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
        typeOfFines: '', 
        fine: '',
        error:'',
    }
  }

  //Kører denne funktion når brugeren trykker på knappen "Giv bøde"
  executefunction(){
    this.createFine();
    this.props.navigation.navigate('AdminFine');
  }


 

  createFine(){
    const {navigation} = this.props;
    const teamID = navigation.getParam('teamID', 'no teamID');
    const specificUserID  = navigation.getParam('specificUserID', 'no Id');
    const totalFine = navigation.getParam('totalFine', 'no fine');
    const username = navigation.getParam('name', 'no username');
    const typeOfFines = this.state.typeOfFines;
    const fine = this.state.fine;

    //opretter bøden i databsen 
    firebase.database().ref('teams/' + teamID + '/members/' + specificUserID + '/fines').push({
        typeOfFines: typeOfFines,
        fine: fine

    }).then((data) => {

        //Opdater samlet beløb, der skyldes
        var updateFine = +totalFine + +fine;

        //Databasekald til at opdater den samlet beløb som skyldes
        firebase.database().ref('teams/' + teamID + '/members/' + specificUserID ).update({
            totalFine: updateFine
        })

        alert('Bøden er blevet tildelt ' + username)

    }).catch ((error) => {
        console.log('error' , error)
    })


  }


  render() {
       return (
         //Viser en inputbox til at skrive årsagen til bøde og en anden til at angive bødensstørrelse
        <View style={styles.container}>
            <Text style={styles.fineContent}>Årsag til bøden</Text>
                <TextInput 
                    style={styles.inputBox}
                  placeholder='Årsag'
                  placeholderTextColor='lightgrey'
                  value={this.state.typeOfFines}
                  onChangeText={typeOfFines => this.setState({ typeOfFines })}
                />

                
                <Text style={styles.fineContent}>Bøde</Text>
                <TextInput 
                    style={styles.inputBox} 
                    keyboardType = 'numeric'
                  placeholder='Beløb "f.eks 100"'
                  placeholderTextColor='lightgrey'
                  value={this.state.fine}
                  onChangeText={fine => this.setState({ fine })}
                />

    
                <TouchableOpacity
                    style={styles.buttons}>
                    <Button 
                    onPress={this.executefunction.bind(this)}
                    title="Giv bøde"
                    color='white'
                    /> 
                </TouchableOpacity>
        </View>
    );
  }
}


//Styling af siden 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    fineContent: {
      fontSize: 16,
      fontWeight: 'bold',
    },

    inputBox: {
      borderWidth: 2,
      borderColor: '#4d4d4d',
      height: '5%',
      width: '60%',
      marginBottom: '3%',
      marginTop: '3%',
      textAlign: 'center'
    },

    buttons: {
        height: '7%',
        width: '60%',
        backgroundColor: '#2980b6',
        marginTop: '3%',
        marginBottom: '3%'

   },


  });
  