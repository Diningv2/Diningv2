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
    // Sets meal and lunch location to Unknown
    getDishObject = (dishName) => {
        const dish = {
            name: "Nothing",
            meal: "Lunch",
            location: "Unknown" 
        }
        return dish
    }
    
    isString = (dish) => {
        return typeof dish === 'string' || dish instanceof String;
    }
    

    render() {
        const { favoriteDish } = this.props;
        // If favoriteDish is an object, proceed, otherwise put the string in an object
        // const favDishObject = favoriteDish.name ? favoriteDish : getDishObject(favoriteDish);
        var favDishObject = undefined;
        
        favDishObject = favoriteDish;
           
        
        // const { name, meal, location } = favDishObject;
        // const { name } = favDishObject;
        const name = favDishObject.hasOwnProperty('name') ? favDishObject.name : favDishObject;
        const meal = favDishObject.hasOwnProperty('meal') ? favDishObject.meal : ["UNKNOWN"];
        const location = favDishObject.hasOwnProperty('location') ? favDishObject.location : ["UNKOWN"];
        

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