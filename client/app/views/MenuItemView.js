import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import connectToRedux from '../redux/lib/connectToRedux';

import Header from '../components/Header';
import NutritionInfo from '../components/NutritionInfo';
import AllergenList from '../components/AllergenList';
import Ingredients from '../components/Ingredients';
import TopTabs from '../components/TopTabs';

class MenuItemView extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        selectedTabName: 'Nutrition'
    };

    setNutrition = () => this.setState({ selectedTabName: 'Nutrition' });
    setAllergens = () => this.setState({ selectedTabName: 'Allergens' });
    setIngredients = () => this.setState({ selectedTabName: 'Ingredients' });

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
                <Header canGoBack title={this.props.menuItem.isLoading ? 'Loading...' : this.props.menuItem.data.name} />
                <ScrollView>
                    <TopTabs tabButtons={this.tabButtons} />
                    {!this.props.menuItem.isLoading && this.state.selectedTabName == 'Nutrition' && <NutritionInfo />}
                    {!this.props.menuItem.isLoading && this.state.selectedTabName == 'Allergens' && <AllergenList />}
                    {!this.props.menuItem.isLoading && this.state.selectedTabName == 'Ingredients' && <Ingredients />}
                </ScrollView>
                {/* <BottomTabs viewName={'DiningHallsView'} /> */}
            </View>
        )
    }
}

export default connectToRedux(MenuItemView, ['menuItem']);