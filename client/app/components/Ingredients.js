import React, { Component } from 'react';
import { View } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

import connectToRedux from '../redux/lib/connectToRedux';

import Ingredient from './Ingredient';
import { DV2ScrollView } from './DV2ScrollView';

class Ingredients extends Component {

    constructor(props) {
        super(props);
    }

    renderIngredients = (ingredient, i) => {
        return (
            <Ingredient
                // add index to ensure uniqueness
                key={ingredient + i}
                title={ingredient}
            />
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Transition appear="bottom">
                    <DV2ScrollView
                        style={{ flex: 1 }}
                        array={this.props.menuItem.data.ingredients}
                        render={(ingredient, i) => this.renderIngredients(ingredient, i)}
                    />
                </Transition>
            </View>
        )
    }
}

export default connectToRedux(Ingredients, ['menuItem']);