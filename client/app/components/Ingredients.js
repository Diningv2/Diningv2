import React, { Component } from 'react';
import { View } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

import connectToRedux from '../redux/lib/connectToRedux';

import Ingredient from './Ingredient';
import { DV2ScrollView } from './DV2ScrollView';
import BoolFilters from './BoolFilters';

class Ingredients extends Component {

    constructor(props) {
        super(props);
    }

    renderIngredients = (ingredient, i) => {
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
                <BoolFilters vegan={this.props.menuItem.data.isVegan} 
                    veg={this.props.menuItem.data.isVegetarian}
                    gf={this.props.menuItem.data.isGlutenFree}/>
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