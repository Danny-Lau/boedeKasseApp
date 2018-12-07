import React from 'react';
import {View, Text, StyleSheet, TextInput, Button } from 'react-native';
import firebase from 'firebase';


export default class GiveFineScreen extends React.Component {

  static navigationOptions = {
    title: "Giv bøde"
  };

  constructor(props) {
    super(props);
    this.state = {
        typeOfFines: '', 
        fine: '',
        error:'',
    }
  }

  executefunction(){
    this.createFine();
    this.props.navigation.navigate('AdminFine');
  }


 

  createFine(){
    const {navigation} = this.props;
    const teamID = navigation.getParam('teamID', 'no teamID');
    const specificUserID  = navigation.getParam('specificUserID', 'no Id');
    const totalFine = navigation.getParam('totalFine', 'no fine');
    const username = navigation.getParam('username', 'no fine');
    const typeOfFines = this.state.typeOfFines;
    const fine = this.state.fine;

    //opretter bøden i firebase
    firebase.database().ref('teams/' + teamID + '/members/' + specificUserID + '/fines').push({
        typeOfFines: typeOfFines,
        fine: fine

    }).then((data) => {

        //Opdater samlet beløb, der skyldes
        var updateFine = +totalFine + +fine;

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
        <View style={styles.container}>
            <Text style={styles.fineContent}>Årsag til bøden</Text>
                <TextInput 
                    style={styles.inputBox}
                  placeholder='Årsag'
                  value={this.state.typeOfFines}
                  onChangeText={typeOfFines => this.setState({ typeOfFines })}
                />

                <Text style={styles.fineContent}>Bøde</Text>
                <TextInput 
                    style={styles.inputBox} 
                    keyboardType = 'numeric'
                  placeholder='Beløb "f.eks 100"'
                  value={this.state.fine}
                  onChangeText={fine => this.setState({ fine })}
                />

                <Button title='Giv bøde' onPress={this.executefunction.bind(this) }></Button>
               
    
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

    fineContent: {
      fontSize: 16,
    },

    inputBox: {
        borderWidth: 2,
        borderColor: 'lightgrey',
        height: 30,
        width: 150,
        marginBottom: 20,
        marginTop: 15,


    }


  });
  