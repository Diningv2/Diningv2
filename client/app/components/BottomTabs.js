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
        console.log(this.props.navigation)
    }

    render() {
        return (
            <View style={tabStyles.container}>
                <View style={{
                    ...styles.container.backgroundColorPrimary, 
                    ...tabStyles.bottomTabs,
                }}>
                    <TouchableOpacity onPress={
                        () => this.props.navigation.navigate('FriendsView')
                    }>
                        <SimpleLineIcons 
                            name={'people'} 
                            size={25} 
                            color={colors.secondary} 
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={
                        () => this.props.navigation.navigate('DiningHallsView')
                    }>
                        <MaterialCommunityIcons 
                            name={'food'}
                            size={25}
                            color={colors.secondary}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={
                        () => this.props.navigation.navigate('FavoritesView')
                    }>
                        <MaterialIcons
                            name={'favorite'}
                            size={25}
                            color={colors.secondary}
                        />
                    </TouchableOpacity>
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
        paddingTop: 10,
        paddingBottom: 10,
    },
})

export default connectToRedux(withNavigation(BottomTabs), [sp.nav]);