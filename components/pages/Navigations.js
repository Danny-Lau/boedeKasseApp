import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import TeamsFineScreen from './TeamsFineScreen'; 
import FineScreen from './FineScreen'
import { Ionicons } from '@expo/vector-icons';

const Profile = createStackNavigator({
  Profile: { screen: ProfileScreen },
});

const Settings = createStackNavigator({
  Settings: { screen: SettingsScreen },
});

const Fine = createStackNavigator({
  Fine: { screen: FineScreen },
});

const TeamsFine = createStackNavigator({
  TeamFine: { screen: TeamsFineScreen },
  Profile: {screen: ProfileScreen},
});

export default createBottomTabNavigator(
  {
    Profil: { screen: Profile },
    "Mine Bøder": {screen: Fine},
    "Mine Hold": {screen: TeamsFine},
    Instillinger: { screen: Settings },
   

  },

  {
    navigationOptions: ({ navigation }) => ({

      tabBarIcon: ({ focused, tintColor }) => {

        const { routeName } = navigation.state;
        var iconName;

        if (routeName === 'Profil') {
          iconName = 'ios-person';
        }else if (routeName === 'Mine Bøder') {
          iconName = 'md-calculator';
        } else if (routeName === 'Mine Hold') {
          iconName = 'ios-football';
        } else if (routeName === 'Instillinger') {
          iconName = 'ios-settings';
        
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);


