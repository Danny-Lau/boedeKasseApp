import React, { Component } from 'react';
import { Text, TextInput,StyleSheet, View, ActivityIndicator, Button } from 'react-native';
import firebase from 'firebase';
import SignUpForm from './SignUpForm';
export default class LoginForm extends Component {


  constructor(props) {
    super(props);
    this.state = {
      email: '', 
      password: '', 
      error: '', 
      loading: false,  
      hasLogin: true 
    }
  }

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ 
      error: '', 
      loading: true 
    });

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(this.onLoginFailed.bind(this));
  }

  onLoginSuccess() {
    this.setState({ 
      email: '', 
      password: '', 
      loading: false, 
      error: '' });
  }

  onLoginFailed(err) {
    this.setState({ 
      loading: false, 
      error: err.message });
  }

  render() {
      switch(this.state.hasLogin) {
          case true:
          return (
            <View style={styles.container}>
                <Text style={styles.LoginContent}>Login</Text>
                <TextInput
                label='Email'
                  placeholder='user@mail.com'
                  value={this.state.email}
                  onChangeText={email => this.setState({ email })}
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
                <Button title='Sign up' onPress={() => this.setState({hasLogin : false})}></Button>
            </View>
          );

          case false: {
            return (
              <View>
                <SignUpForm/>
                <Button title='Tilbage' onPress={() => this.setState({hasLogin : true})}/>
              </View>
            )
          }
      }  
  }

  renderButton() {
    if(this.state.loading) {
      return <ActivityIndicator size='small' />
    }
    return (
      <Button title="Login" onPress={this.onButtonPress.bind(this)}>
      </Button>
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
  LoginContent: {
    fontSize: 24,

  },
});

