import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

import connectToRedux from '../redux/lib/connectToRedux';
import sp from '../redux/lib/stateProperties';

import Header from '../components/Header';
import ListItem from '../components/ListItem';
import BottomTabs from '../components/BottomTabs';

import styles from '../config/styles';

class MenuView extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // TODO: Check which dhall you're in from Redux state and 
        // pass in appropriate location ID - maybe have global mapping
        this.props.getMenus(1); 
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Header title="Dining Halls" /> 
                <Transition appear="bottom">
                    <View style={{...styles.container.withPadding}}>
                        <TouchableOpacity>
                            <ListItem title="Cheesecake" subtitle="Open from 5:00pm to 7:00pm" />
                        </TouchableOpacity>
                    </View>
                </Transition>
                <BottomTabs viewName={'MenuView'}/>
            </View>
        )
    }
}

export default connectToRedux(MenuView, ['menusList']);