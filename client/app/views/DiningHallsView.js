import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';

import styles from '../config/styles';
import connectToRedux from '../redux/lib/connectToRedux';

import DiningHallItem from '../components/DiningHallItem';
import { DV2ScrollView } from '../components/DV2ScrollView';
import Header from '../components/Header';
import dHallIDs from '../config/dHallIDs';
import { AnimatedListItem } from '../components/Animatable';
import { LoadingIndicator } from '../components/LoadingIndicator';

// Shows list of dining halls with busyness bar
class DiningHallsView extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // If not yet loaded, call redux action to get dhalls from yale's api
        if (this.props.diningHallsList.isLoading) {
            this.props.getAllDiningHallsInformation();
        }
    }

    // Renders a given dining hall + busyness meter in the ScrollView
    renderDiningHall = (diningHall, index) => {
        return (
            <AnimatedListItem key={index} index={index}>
                <TouchableOpacity
                    key={diningHall.name}
                    onPress={() => {
                        // Set redux state with menu for this dHall
                        this.props.getMenus(dHallIDs[diningHall.name]); 
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
                            // Loading complete, show list of DiningHallItems
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
        );
    }
}

export default connectToRedux(DiningHallsView, ['diningHallsList']);