// React/React Native imports
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

// Redux imports
import connectToRedux from '../redux/lib/connectToRedux';
import sp from '../redux/lib/stateProperties';

// Custom component imports
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import BottomTabs from '../components/BottomTabs';

// Style library import
import styles from '../config/styles';


class DiningHallsView extends Component {

    constructor(props) {
        super(props);
    }

    diningHalls = [
        {
            dHallName: 'Berkeley',
        },
        {
            dHallName: 'Timothy Dwight',
        },
        {
            dHallName: 'Jonathan Edwards',
        },
        {
            dHallName: 'Saybrook',
        },
    ]

    // {this.diningHalls.map(dHall => { return (
    //     <TouchableOpacity>
    //         <ListItem title="Berkeley" subtitle="Open from 5:00pm to 7:00pm" />
    //     </TouchableOpacity>
    // )})}

    render() {
        return (
            <View style={{flex: 1}}>
                <Header title="Dining Halls" />
                <Transition appear="bottom">
                    <View style={{...styles.container.withPadding}}>
                        {getDhallList()}
                    </View>
                </Transition>
                <BottomTabs viewName={'DiningHallsView'}/>
            </View>
        )
    }

    getDhallList() {
        return this.diningHalls.map(dHall => { return (
            <TouchableOpacity 
                onPress={() => {
                    // TODO: Set redux state with menu for this dHall
                    // TODO: Set redux state that we're viewing dHall.dHallName

                    this.props.navigation.navigate('MenuView');
                }} 
            >
                <ListItem 
                    title={dHall.dHallName} 
                    subtitle="Open from 5:00pm to 7:00pm" 
                />
            </TouchableOpacity>
        )})
    }


}

// TODO: make + connect to some sp.viewingDHall or something
export default connectToRedux(DiningHallsView, [sp.incrementingValues]);