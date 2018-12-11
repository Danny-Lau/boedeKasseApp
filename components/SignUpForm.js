import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, View, ActivityIndicator, Button } from 'react-native';
import firebase from 'firebase';

export default class SignUpForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '', 
      password: '', 
      loading: false,
      userId: '',
      teams:'',
      username:''   
    }
  }

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ 
      error: '', 
      loading: true 
    });

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(this.onSignUpSuccess.bind(this))
        .catch(this.onSignUpFailed.bind(this));
  }

  onSignUpSuccess() {
    this.setState({ 
      email: '', 
      password: '', 
      loading: false, 
      error: '' 
    });
    
    const userId = firebase.auth().currentUser.uid;
    const mail = firebase.auth().currentUser.email;
    const username = this.state.username;

    firebase.database().ref().child('users').child(userId).set({
      email: mail,
      adminTeams: null,
      username: username
  
    })
    alert("Din bruger blev oprettet");
  }
    
  

  onSignUpFailed(err) {
    this.setState({ 
      loading: false, 
      error: err.message });
  }

  render() {
    return (
      <View>
          <Text style={styles.LoginText}>Sign up</Text>

          <TextInput
            style={styles.inputBox}
            placeholder='User@mail.com'
            placeholderTextColor='rgba(225,225,225,0.7)'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />

          <TextInput
            style={styles.inputBox}
            label='Username'
            placeholderTextColor='rgba(225,225,225,0.7)'
            placeholder='Brugernavn'
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
          />

          <TextInput
            style={styles.inputBox}
            placeholder='Password'
            placeholderTextColor='rgba(225,225,225,0.7)'
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
          />
        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

          {this.renderButton()}
      </View>
    );
  }

  renderButton() {
    if(this.state.loading) {
      return <ActivityIndicator size='small' />
    }
    return (
      <TouchableOpacity
        style={styles.buttons}>
        
        <Button 
          onPress={this.onButtonPress.bind(this)}            
          title="Sign up"
          color='rgb(204, 204, 204)'
          /> 
          </TouchableOpacity> 
          );
        }
      }

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },

  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  LoginText: {
    fontSize: 24,
    color: 'rgb(204, 204, 204)',
    textAlign: 'center'

  },
  inputBox: {
    borderWidth: 2,
    borderColor: 'lightgrey',
    height: 40,
    width: 225,
    marginBottom: 4,
    marginTop: '5%',
    textAlign: 'center'
},

  buttons: {
    borderColor: 'lightgrey',
    height: 40,
    width: 225,
    backgroundColor: '#2980b6',
    marginBottom: 12,
 }


});