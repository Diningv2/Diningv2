import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

import connectToRedux from '../redux/lib/connectToRedux';
import sp from '../redux/lib/stateProperties';

import Header from '../components/Header';
import Ingredient from '../components/Ingredient';
import BottomTabs from '../components/BottomTabs';

import styles from '../config/styles';

class IngredientsView extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // TODO: make sure that this is the appropriate interface to get the itemID
        this.props.getMenuItemInformation(this.props.menu.data.itemID);
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
                                : Object.keys(this.props.menuItem.data.ingredients).forEach(ingredient => {
                                    return (
                                        // TODO: Implement this component
                                        <Ingredient
                                            key={ingredient}
                                            title={ingredient}
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

export default connectToRedux(MenuItemView, ['menuItem']);