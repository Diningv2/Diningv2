import React from 'react';
import ItemCard from './ItemCard';
import connectToRedux from '../redux/lib/connectToRedux';
import sp from '../redux/lib/stateProperties';
import { formatArrayAsString } from '../lib/string-utility';
import formattedMealTypes from '../config/formattedMealTypes';

class FavoriteServedTodayCard extends React.Component {

    constructor(props) {
        super(props);
    }

    formatMealsString = (mealsArray) => {
        const formattedMealTypesArray = (mealsArray || []).map(mealType => {
            return formattedMealTypes[mealType];
        })

        return formatArrayAsString(formattedMealTypesArray);
    }

    formatLocationsString = (locationsArray) => {
        return "Served at " + formatArrayAsString(locationsArray);
    }

    render() {
        const { favoriteDish } = this.props;

        // populate variables based on that properties favoriteDish contains
        // if doesn't contain name field, favoriteDish is just a string
        const name = favoriteDish.hasOwnProperty('name') ? favoriteDish.name : favDishObject;
        const meal = favoriteDish.hasOwnProperty('meal') ? favoriteDish.meal : ["UNKNOWN"];
        const location = favoriteDish.hasOwnProperty('location') ? favoriteDish.location : ["UNKOWN"];
        

        const mealsString = this.formatMealsString(meal);
        const locationsString = this.formatLocationsString(location);

        return (
            <ItemCard
                title={name}
                subTitle={mealsString}
                caption={locationsString}
            />
        )
    }
}

export default connectToRedux(FavoriteServedTodayCard, [sp.favoritesList]);