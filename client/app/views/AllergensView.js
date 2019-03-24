import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

import connectToRedux from '../redux/lib/connectToRedux';
import sp from '../redux/lib/stateProperties';

import Header from '../components/Header';
import Allergen from '../components/Allergen';
import BottomTabs from '../components/BottomTabs';

import styles from '../config/styles';

class AllergensView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title={this.props.menuItem.data.name} />
                <Transition appear="bottom">
                    <View style={{ ...styles.container.withPadding, maxHeight: 500 }}>
                        <ScrollView>
                            {this.props.menuItem.isLoading
                                ? <Text>Loading...</Text>
                                : this.props.menuItem.data.filterProperties.forEach(allergen => {
                                    return (
                                        // TODO: Implement this component
                                        <Allergen
                                            key={allergen}
                                            title={allergen}
                                        />
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </Transition>
                <BottomTabs viewName={'MenuItemView'} />
            </View>
        )
    }
}

export default connectToRedux(AllergensView, ['menuItem']);