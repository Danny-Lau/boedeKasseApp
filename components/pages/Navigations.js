import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import ProfileScreen from './ProfileScreen';
import TeamsScreen from './FineScreens/TeamsScreen'; 
import AdminFineScreen from './AdminFineScreen';
import SpecificTeamsFineScreen from './FineScreens/SpecificTeamFineScreen';
import SpecificUserScreen from './FineScreens/SpecificUserScreen';
import CreateTeamScreen from './FineScreens/CreateTeamScreen';
import JoinTeamScreen from './FineScreens/JoinTeamScreen';
import ConfirmJoinTeam from './FineScreens/ConfirmJoinTeam';
import GiveFineScreen from './FineScreens/GiveFineScreen';

import { Ionicons } from '@expo/vector-icons';


const Profile = createStackNavigator({
  Profile: { screen: ProfileScreen },
});

const Fine = createStackNavigator({
  AdminFine: { screen: AdminFineScreen },
  CreateTeam: { screen: CreateTeamScreen},
  SpecificTeam: { screen: SpecificTeamsFineScreen},
  JoinTeam: { screen: JoinTeamScreen},
  SpecificUser: { screen: SpecificUserScreen},
  Confirm: { screen: ConfirmJoinTeam},
  GiveFine: { screen: GiveFineScreen}

});

const TeamsFine = createStackNavigator({
  TeamScreen: { screen: TeamsScreen },
  SpecificTeam: { screen: SpecificTeamsFineScreen },
  SpecificUser: { screen: SpecificUserScreen},
  CreateTeam: { screen: CreateTeamScreen},
  AdminFine: { screen: AdminFineScreen }
});

export default createBottomTabNavigator(
  {
    Profil: { screen: Profile },
    "Administrere": {screen: Fine},
    "Mine Bøder": {screen: TeamsFine},

  },

  {
    navigationOptions: ({ navigation }) => ({

      tabBarIcon: ({ focused, tintColor }) => {

        const { routeName } = navigation.state;
        var iconName;

        if (routeName === 'Profil') {
          iconName = 'ios-person';
        }else if (routeName === 'Administrere') {
          iconName = 'md-calculator';
        } else if (routeName === 'Mine Bøder') {
          iconName = 'ios-football';
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


