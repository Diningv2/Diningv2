// React/React Native imports
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

// Redux imports
import connectToRedux from '../redux/lib/connectToRedux';
import sp from '../redux/lib/stateProperties';

// Custom component imports
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import BottomTabs from '../components/BottomTabs';

// Style library import
import styles from '../config/styles';



class DiningHallsView extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        selectedTabName: 'Nutrition'
    };

    setNutrition = () => this.setState({selectedTabName: 'Nutrition'});
    setAllergens = () => this.setState({selectedTabName: 'Allergens'});
    setIngredients = () => this.setState({selectedTabName: 'Ingredients'});

    tabButtons = [
        {
          tabName: 'Nutrition',
          function: this.setNutrition
        },
        {
          tabName: 'Allergens',
          function: this.setAllergens
        },
        {
          tabName: 'Ingredients',
          function: this.setIngredients
        }
    ]

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title= {this.props.menuItem.isLoading ? 'Loading...' : this.props.menuItem.data.name} />
                <TopTabs tabButtons={this.tabButtons} />
                {this.state.selectedTabName == 'Nutrition' && <NutritionInfoView/>}
                {this.state.selectedTabName == 'Allergens' && <AllergenView/>}
                {this.state.selectedTabName == 'Ingredients' && <IngredientsView/>}
                <BottomTabs viewName={'DiningHallsView'} />
            </View>
        )
    }
}

export default connectToRedux(DiningHallsView, ['diningHallsList']);