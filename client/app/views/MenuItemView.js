import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import connectToRedux from '../redux/lib/connectToRedux';

import Header from '../components/Header';
import NutritionInfo from '../components/NutritionInfo';
import AllergenList from '../components/AllergenList';
import Ingredients from '../components/Ingredients';
import TopTabs from '../components/TopTabs';
import BottomTabs from '../components/BottomTabs';

class MenuItemView extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        selectedTabName: 'Nutrition'
    };

    // functions for toptabs
    // clicking a tab navigates to its page
    setNutrition = () => this.setState({ selectedTabName: 'Nutrition' });
    setAllergens = () => this.setState({ selectedTabName: 'Allergens' });
    setIngredients = () => this.setState({ selectedTabName: 'Ingredients' });

    // Names of top tabs
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
        // Show information associated with selected tab
        return (
            <View style={{ flex: 1 }}>
                <Header canGoBack title={this.props.menuItem.isLoading ? 'Loading...' : this.props.menuItem.data.name} />
                <View style={{
                    ...styles.topTabs.withPaddingTop,
                    ...styles.topTabs.withPaddingBottom,
                }}>
                    <TopTabs tabButtons={this.tabButtons} />
                </View>
                <View style={{flex: 1}}>
                    {!this.props.menuItem.isLoading && this.state.selectedTabName == 'Nutrition' && <NutritionInfo />}
                    {!this.props.menuItem.isLoading && this.state.selectedTabName == 'Allergens' && <AllergenList />}
                    {!this.props.menuItem.isLoading && this.state.selectedTabName == 'Ingredients' && <Ingredients />}
                </View>
            </View>
        )
    }
}

export default connectToRedux(MenuItemView, ['menuItem']);