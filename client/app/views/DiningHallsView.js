import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

import styles from '../config/styles';

import connectToRedux from '../redux/lib/connectToRedux';

import DiningHallItem from '../components/DiningHallItem';
import { DV2ScrollView } from '../components/DV2ScrollView';
import Header from '../components/Header';
import dHallIDs from '../config/dHallIDs';
import BottomTabs from '../components/BottomTabs';
import CenterTextView from '../components/CenterTextView';
import { AnimatedListItem } from '../components/Animatable';
import { LoadingIndicator } from '../components/LoadingIndicator';

class DiningHallsView extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.diningHallsList.isLoading) {
            this.props.getAllDiningHallsInformation();
        }
    }

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
                <View style={{flex: 1}}>
                    {this.props.diningHallsList.isLoading 
                        ? (
                            <LoadingIndicator />
                        ) : (
                            <View style={{paddingTop: 10}}>
                                <DV2ScrollView 
                                    array={this.props.diningHallsList.data}
                                    render={(element, index) => this.renderDiningHall(element, index)}
                                />
                            </View>
                        )
                    }
                </View>
            </View>
        )
    }
}

export default connectToRedux(DiningHallsView, ['diningHallsList']);