// React/React Native imports
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

// Redux imports
import connectToRedux from '../redux/lib/connectToRedux';
import sp from '../redux/lib/stateProperties';

// Custom component imports
import Header from '../components/Header';
import NutritionInfo from '../components/NutritionInfo';
import AllergenList from '../components/AllergenList';
import Ingredients from '../components/Ingredients';

import ListItem from '../components/ListItem';
import BottomTabs from '../components/BottomTabs';
import TopTabs from '../components/TopTabs';

// Style library import
import styles from '../config/styles';



class MenuItemView extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        selectedTabName: 'Allergens'
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
            <View style={{flex: 1}}>
                <Header canGoBack title={this.props.menuItem.isLoading ? 'Loading...' : this.props.menuItem.data.name} />
                <ScrollView>
                    <TopTabs tabButtons={this.tabButtons} />
                    {!this.props.menuItem.isLoading && this.state.selectedTabName == 'Nutrition' && <NutritionInfo/>}
                    {!this.props.menuItem.isLoading && this.state.selectedTabName == 'Allergens' && <AllergenList/>}
                    {!this.props.menuItem.isLoading && this.state.selectedTabName == 'Ingredients' && <Ingredients/>}
                </ScrollView>
                {/* <BottomTabs viewName={'DiningHallsView'} /> */}
            </View>
        )
    }
}

export default connectToRedux(MenuItemView, ['menuItem']);