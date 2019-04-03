import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import connectToRedux from '../redux/lib/connectToRedux';
import sp from '../redux/lib/stateProperties';

import styles, { colors } from '../config/styles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

class BottomTabs extends Component {

    constructor(props) {
        super(props);
    }

    tabButtons = [
        {
            viewName: 'AllergensView',
            IconComponent: Ionicons,
            iconName: 'md-person',
            opacity: this.props.viewName == 'AllergensView' ? 1 : .3,
        },
        {
            viewName: 'DiningHallsView',
            IconComponent: MaterialCommunityIcons,
            iconName: 'food',
            opacity: this.props.viewName == 'DiningHallsView' ? 1 : .3,
        },
        {
            viewName: 'FavoritesView',
            IconComponent: MaterialIcons,
            iconName: 'favorite',
            opacity: this.props.viewName == 'FavoritesView' ? 1 : .3,
        }
    ]

    render() {
        return (
            <View style={tabStyles.container2}>
                <View style={{
                    ...styles.container.backgroundColorPrimary,
                    ...tabStyles.bottomTabs,
                }}>
                    {this.tabButtons.map(tabButton => {
                        return (
                            <TouchableOpacity
                                key={tabButton.viewName}
                                activeOpacity={.3}
                                style={{ ...tabStyles.touchables, opacity: tabButton.opacity }}
                                onPress={() => this.props.navigation.navigate(tabButton.viewName)}
                            >
                                <tabButton.IconComponent
                                    name={tabButton.iconName}
                                    size={25}
                                    color={colors.secondary}
                                />
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        );
    }

}

const tabStyles = StyleSheet.create({
    container2: {
        position: 'absolute',
        bottom: 0,
    },
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