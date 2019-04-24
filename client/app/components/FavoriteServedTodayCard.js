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

    // Temporary fix: if only a string is passed in, 
    // Set meal to Lunch and location to Hopper (randomly chosen)
    getDishObject = (dishName) => {
        const dish = {
            name: dishName,
            meal: "Unknown",
            location: "Unknown"
             
        }
        return dish
    }
    
    

    render() {
        const { favoriteDish } = this.props;
        // If favoriteDish is an object, proceed, otherwise put the string in an object
        const favDishObject = favoriteDish.name ? favoriteDish : getDishObject(favoriteDish);
        const { name, meal, location } = favDishObject;
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