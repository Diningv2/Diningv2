import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import connectToRedux from '../redux/lib/connectToRedux';
import sp from '../redux/lib/stateProperties';

import styles, { colors } from '../config/styles';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

class BottomTabs extends Component {

    constructor(props) {
        super(props);
    }

    tabButtons = [
        {
          viewName: 'FriendsView',
          IconComponent: SimpleLineIcons,
          iconName: 'people',
        },
        {
          viewName: 'DiningHallsView',
          IconComponent: MaterialCommunityIcons,
          iconName: 'food',
        },
        {
          viewName: 'FavoritesView',
          IconComponent: MaterialIcons,
          iconName: 'favorite',
        }
    ]

    render() {
        return (
            <View style={tabStyles.container}>
                <View style={{
                    ...styles.container.backgroundColorPrimary, 
                    ...tabStyles.bottomTabs,
                }}>
                    {this.tabButtons.map(tabButton => { return (
                        <TouchableOpacity 
                            key={tabButton.viewName} 
                            style={tabStyles.touchables}
                            onPress={() => this.props.navigation.navigate(tabButton.viewName)}
                        >
                            <tabButton.IconComponent 
                                name={tabButton.iconName} 
                                size={25} 
                                color={colors.secondary} 
                            />
                        </TouchableOpacity>
                    )})}
                </View>
            </View>
        );
    }

}

const tabStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    bottomTabs: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    touchables: {
        width: '33.3%', 
        alignItems: 'center', 
        paddingTop: 10, 
        paddingBottom: 10,
    }
})

export default connectToRedux(withNavigation(BottomTabs), [sp.nav]);