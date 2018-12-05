import React from 'react';
import {View, Text } from 'react-native';

export default class SpecifikUserScreen extends React.Component {
    
  static navigationOptions = {
    title: "Bøder for brugeren"
  };
  render() {
    const {navigation} = this.props;
    const username = navigation.getParam('name', 'No username');
    const teamID = navigation.getParam('fine');
    

    alert(teamID + username)

    return (
        <View>
         
        </View>
    );
  }
}
