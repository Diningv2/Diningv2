import React, { Component } from 'react';
import { View } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

import connectToRedux from '../redux/lib/connectToRedux';

import NutritionInfoField from '../components/NutritionInfoField';

import { DV2ScrollView } from './DV2ScrollView';

class NutritionInfo extends Component {

    constructor(props) {
        super(props);
    }

    formatted = {
        servingSize: "Serving Size",
        calories: "Calories",
        fat: "Fat",
        carbohydrates: "Carbs",
        protein: "Protein",
        sugar: "Sugar",
        fiber: "Fiber",
        saturatedFat: "Saturated Fat",
        cholesterol: "Cholesterol",
        vitaminA: "Vitamin A",
        vitaminC: "Vitamin C",
        iron: "Iron"
    }

    renderNutritionInfoFields = field => {
        return (
            <NutritionInfoField
                key={field}
                field={this.formatted[field]}
                value={this.props.menuItem.data.nutrition[field]}
            />
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Transition appear="bottom">
                    <DV2ScrollView
                        style={{ flex: 1 }}
                        array={Object.keys(this.props.menuItem.data.nutrition)}
                        render={element => this.renderNutritionInfoFields(element)}
                    />
                </Transition>
            </View>
        );
    }
}

export default connectToRedux(NutritionInfo, ['menuItem']);