import React, { Component } from 'react';
import { View } from 'react-native';
import connectToRedux from '../redux/lib/connectToRedux';

import Ingredient from './Ingredient';
import { DV2ScrollView } from './DV2ScrollView';
import BoolFilters from './BoolFilters';

/** Component that renders a list of Ingredients */
class Ingredients extends Component {

    constructor(props) {
        super(props);
    }

    renderIngredients = (ingredient, i) => {
        // render function needed by dv2scrollview
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
                { (this.props.menuItem.data.isVegan || 
                    this.props.menuItem.data.isVegetarian || 
                    this.props.menuItem.data.isGlutenFree) &&
                    // determines whether to add icon for gf, vegan, veg
                    <BoolFilters vegan={this.props.menuItem.data.isVegan} 
                        veg={this.props.menuItem.data.isVegetarian}
                        gf={this.props.menuItem.data.isGlutenFree}/>
                }
                    <DV2ScrollView
                        // List of ingredients in menuItem
                        style={{ flex: 1 }}
                        array={this.props.menuItem.data.ingredients}
                        render={(ingredient, i) => this.renderIngredients(ingredient, i)}
                    />
            </View>
        )
    }
}

export default connectToRedux(Ingredients, ['menuItem']);