import React, { Component } from 'react';
import { Text, TextInput,StyleSheet, View, ActivityIndicator, Button } from 'react-native';
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
    
    var userId = firebase.auth().currentUser.uid;
    var mail = firebase.auth().currentUser.email;
    var teams = this.state.teams;
    var username = this.state.username;

    firebase.database().ref().child('users').child(userId).set({
      email: mail,
      teams: null,
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
          <Text>Sign up</Text>

          <TextInput
          label='Email'
            placeholder='user@mail.com'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />

          <TextInput
          label='Username'
            placeholder='Brugernavn'
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
          />

          <TextInput
            placeholder='password'
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
      <Button title="Sign up" onPress={this.onButtonPress.bind(this)}>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
});