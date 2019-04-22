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
        const { name, meal, location } = favoriteDish;
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