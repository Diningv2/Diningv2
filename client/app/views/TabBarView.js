import { createMaterialTopTabNavigator } from 'react-navigation';
import React from 'react';
import { SimpleLineIcons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import styles, { colors } from '../config/styles';

export default createTabBarView = (routes) => createMaterialTopTabNavigator(routes, {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent, iconName;

        switch (routeName) {
          case 'FriendsView':
            IconComponent = SimpleLineIcons;
            iconName = 'people';
            break;

          case 'DiningHallsView':
            IconComponent = MaterialCommunityIcons;
            iconName = 'food';
            break;

          case 'FavoritesView':
            IconComponent = MaterialIcons;
            iconName = 'favorite';
            break;
          
          default:
            IconComponent = MaterialIcons;
            iconName = 'block';
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