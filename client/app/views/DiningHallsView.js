// React/React Native imports
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
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
import DiningHallItem from '../components/DiningHallItem';
import { DV2ScrollView } from '../components/DV2ScrollView';



class DiningHallsView extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.diningHallsList.isLoading) this.props.getAllDiningHallsInformation();
    }

    renderDiningHall = (diningHall) => {
        return (
            <DiningHallItem
                key={diningHall.name}
                name={diningHall.name} 
                isOpen={diningHall.isOpen}
                busyness={diningHall.busyness}                        
            />
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title="Dining Halls" />
                {!this.props.diningHallsList.isLoading &&
                <Transition appear="bottom">
                    <DV2ScrollView style={{flex: 1}}
                        array={this.props.diningHallsList.data}
                        render={(element) => this.renderDiningHall(element)} 
                    />
                </Transition>
                }
                {this.props.diningHallsList.isLoading && 
                    <Transition appear="top">
                        <Text>Loading...</Text>
                    </Transition>
                }
            </View>
        )
    }
}

export default connectToRedux(DiningHallsView, ['diningHallsList']);