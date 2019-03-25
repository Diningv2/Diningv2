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

    locationIndices = {
        'Berkeley': 1,
        'Branford': 2,
        'Grace Hopper': 3,
        'Davenport': 4,
        'Morse': 5,
        
    }

    componentDidMount() {
        if (this.props.diningHallsList.isLoading) {
            this.props.getAllDiningHallsInformation();
        }
    }

    renderDiningHall = (diningHall, index) => {
        return (
            <TouchableOpacity 
                key={diningHall.name}
                onPress={() => {
                    this.props.getMenus(index+1); // Set redux state with menu for this dHall
                    this.props.navigation.navigate('MenuView');
                    console.log("Sanity");
                }}  
            >
                <DiningHallItem
                    name={diningHall.name} 
                    isOpen={diningHall.isOpen}
                    busyness={diningHall.busyness}                       
                />
            </TouchableOpacity>
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
                            render={(element, index) => this.renderDiningHall(element, index)} 
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