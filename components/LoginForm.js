import React, { Component } from 'react';
import { Text, TextInput, StyleSheet, View, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
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
      error: '' })
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
                <Text style={styles.LoginText}>Login</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder='User@mail.com'
                  placeholderTextColor='rgba(225,225,225,0.7)'
                  value={this.state.email}
                  onChangeText={email => this.setState({ email })}
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
                <TouchableOpacity
                    style={styles.buttons}>
                    <Button 
                    onPress={() => this.setState({hasLogin : false})}            
                    title="Sign up"
                    color='rgb(204, 204, 204)'
                    /> 
                </TouchableOpacity> 
            
                
            </View>
          );

          case false: {
            return (
              <View style={styles.container}>
                <SignUpForm/>
                  <TouchableOpacity
                    style={styles.buttons}>
                      <Button 
                        onPress={() => this.setState({hasLogin : true})}           
                        title="Tilbage"
                        color='rgb(204, 204, 204)'
                        /> 
                </TouchableOpacity> 
                  
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
    <TouchableOpacity
      style={styles.buttons}>
        <Button 
          onPress={this.onButtonPress.bind(this)}            
          title="Login"
          color='rgb(204, 204, 204)'
        /> 
    </TouchableOpacity> 
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  LoginText: {
    fontSize: 24,
    color: 'rgb(204, 204, 204)'

  },

  inputBox: {
    borderWidth: 2,
    borderColor: 'lightgrey',
    height: '5%',
    width: '60%',
    marginBottom: '3%',
    marginTop: '5%',
    textAlign: 'center'
},

  buttons: {
    borderColor: 'lightgrey',
    height: '6%',
    width: '60%',
    backgroundColor: '#2980b6',
    marginBottom: '3%',

 }



});

