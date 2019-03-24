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



class DiningHallsView extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getAllDiningHallsInformation();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title="Dining Halls" />
                <Transition appear="bottom">
                    <View style={{...styles.container.withPadding, maxHeight: 500}}>
                        <ScrollView>
                            {!this.props.diningHallsList.isLoading &&
                                this.props.diningHallsList.data.map(diningHall => {
                                    return (
                                        <ListItem key={diningHall.name} title={diningHall.name} />
                                    )
                                })}
                            {this.props.diningHallsList.isLoading && <Text>Loading...</Text>}
                        </ScrollView>
                    </View>
                </Transition>
                <BottomTabs viewName={'DiningHallsView'} />
            </View>
        )
    }
}

export default connectToRedux(DiningHallsView, ['diningHallsList']);