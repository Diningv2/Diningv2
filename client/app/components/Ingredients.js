import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

import connectToRedux from '../redux/lib/connectToRedux';

import Ingredient from './Ingredient';
import { DV2ScrollView } from './DV2ScrollView';

class Ingredients extends Component {

    constructor(props) {
        super(props);
    }

    renderIngredients = ingredient => {
        return (
            <Ingredient
                key={ingredient}
                title={ingredient}
            />
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Transition appear="bottom">
                    <DV2ScrollView 
                        style={{flex: 1}} 
                        array={this.props.menuItem.data.ingredients}
                        render={ingredient => this.renderIngredients(ingredient)}
                    />
                </Transition>
            </View>
        )
    }
}

export default connectToRedux(Ingredients, ['menuItem']);