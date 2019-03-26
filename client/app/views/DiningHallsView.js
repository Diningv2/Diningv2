import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

import styles from '../config/styles';

import connectToRedux from '../redux/lib/connectToRedux';

import DiningHallItem from '../components/DiningHallItem';
import { DV2ScrollView } from '../components/DV2ScrollView';
import Header from '../components/Header';
import dHallIDs from '../config/dHallIDs';
import { AnimatedListItem } from '../components/Animatable';

class DiningHallsView extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.diningHallsList.isLoading) {
            this.props.getAllDiningHallsInformation();
        }
    }

    dummy = [
        {name: "Morse", busyness: 6, isOpen: true},
        {name: "Berkeley", busyness: 3, isOpen: true},
        {name: "Davenport", busyness: 5, isOpen: true},
    ]

    renderDiningHall = (diningHall, index) => {
        return (
            <AnimatedListItem key={index} index={index}>
                <TouchableOpacity
                    key={diningHall.name}
                    onPress={() => {
                        this.props.getMenus(dHallIDs[diningHall.name]); // Set redux state with menu for this dHall
                        this.props.navigation.navigate('MenuView');
                    }}
                >
                    <DiningHallItem
                        name={diningHall.name}
                        isOpen={diningHall.isOpen}
                        busyness={diningHall.busyness}
                    />
                </TouchableOpacity>          
            </AnimatedListItem>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title="Dining Halls" />
                {!this.props.diningHallsList.isLoading &&
                    <View>
                        <DV2ScrollView style={{ flex: 1 }}
                            array={this.props.diningHallsList.data}
                            render={(element, index) => this.renderDiningHall(element, index)}
                        />
                    </View>
                }
                {this.props.diningHallsList.isLoading &&
                    <Transition appear="bottom">
                        <View style={{ ...styles.container.center }}>
                            <Text style={{ ...styles.font.type.primaryRegular, ...styles.font.color.primary }}>Loading...</Text>
                        </View>
                    </Transition>
                }
            </View>
        )
    }
}

export default connectToRedux(DiningHallsView, ['diningHallsList']);