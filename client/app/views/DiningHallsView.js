// React/React Native imports
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

// Redux imports
import connectToRedux from '../redux/lib/connectToRedux';
import sp from '../redux/lib/stateProperties';

// Custom component imports
import Header from '../components/Header';
import ListItem from '../components/ListItem';

// Style library import
import styles from '../config/styles';


class DiningHallsView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
            <Header title="Dining Halls" />
            <Transition appear="bottom">
                <View style={{...styles.container.withPadding}}>
                    <TouchableOpacity>
                        <ListItem title="Berkeley" subtitle="Open from 5:00pm to 7:00pm" />
                    </TouchableOpacity>
                </View>
            </Transition>
            </View>
        )
    }
}

export default connectToRedux(DiningHallsView, [sp.incrementingValues]);