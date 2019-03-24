import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import connectToRedux from '../redux/lib/connectToRedux';
import sp from '../redux/lib/stateProperties';

class MenuItem extends Component {

    constructor(props) {
        super(props);
    }

    // Contact redux to get the menus for this dining hall

    render() {
        return (
            <View>
                
            </View>
        );
    }

}