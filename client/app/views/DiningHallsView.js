import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

import styles from '../config/styles';

import connectToRedux from '../redux/lib/connectToRedux';

import DiningHallItem from '../components/DiningHallItem';
import { DV2ScrollView } from '../components/DV2ScrollView';
import Header from '../components/Header';
import dHallIDs from '../config/dHallIDs';
import BottomTabs from '../components/BottomTabs';
import CenterTextView from '../components/CenterTextView';

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
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title="Dining Halls" />
                <View style={{paddingBottom: 50, flex: 1}}>
                    {this.props.diningHallsList.isLoading 
                        ? (
                            <CenterTextView message="Loading..." />
                        ) : (
                            <View>
                                <DV2ScrollView 
                                    array={this.props.diningHallsList.data}
                                    render={(element, index) => this.renderDiningHall(element, index)}
                                />
                            </View>
                        )
                    }
                </View>
                <BottomTabs viewName={"DiningHallsView"}/>
            </View>
        )
    }
}

export default connectToRedux(DiningHallsView, ['diningHallsList']);