import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

import connectToRedux from '../redux/lib/connectToRedux';

import Ingredient from './Ingredient';

import styles from '../config/styles';

class Ingredients extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Transition appear="bottom">
                    <View style={{ ...styles.container.withPadding, maxHeight: 500 }}>
                        <ScrollView>
                            {this.props.menuItem.data.ingredients.map(ingredient => {
                                    return (
                                        // TODO: Implement this component
                                        <Ingredient
                                            key={ingredient}
                                            title={ingredient}
                                        />
                                    );
                                })
                            }
                        </ScrollView>
                    </View>
                </Transition>
            </View>
        )
    }
}

export default connectToRedux(Ingredients, ['menuItem']);