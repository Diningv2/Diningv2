import { createMaterialTopTabNavigator } from 'react-navigation';
import React from 'react';
import { SimpleLineIcons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import styles, { colors } from '../config/styles';
import { View } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

export default createTabBarView = (routes) => createMaterialTopTabNavigator(routes, {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent, iconName;
        if (routeName === 'FriendsView') {
            IconComponent = SimpleLineIcons;
            iconName = 'people';
        } else if (routeName === 'DiningHallsView') {
            IconComponent = MaterialCommunityIcons;
            iconName = 'food';
        } else if (routeName === 'FavoritesView') {
            IconComponent = MaterialIcons;
            iconName = 'favorite';
        }
        
        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;

      }
    }),
    initialRouteName: 'DiningHallsView',
    swipeEnabled: false,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: colors.secondary,
      inactiveTintColor: 'rgba(255, 255, 255, 0.7)',
      indicatorStyle: {
        backgroundColor: colors.secondary,
      },
      style: {
        backgroundColor: colors.primary,
        color: colors.secondary
      }
    },

});