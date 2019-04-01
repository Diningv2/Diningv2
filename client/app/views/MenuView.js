import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';

import connectToRedux from '../redux/lib/connectToRedux';
import { search } from '../lib/search-utility';

import Header from '../components/Header';
import ListItem from '../components/ListItem';
import TopTabs from '../components/TopTabs';
import Searchbar from '../components/Searchbar';
import { DV2ScrollView } from '../components/DV2ScrollView';

import styles from '../config/styles';
import CenterTextView from '../components/CenterTextView';
import BottomTabs from '../components/BottomTabs';

class MenuView extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        mealArray: undefined,
        mealArrayFiltered: undefined,
        hoursMessage: ""
    }

    performSearch = (searchTerm) => {
        if (searchTerm === "") {
            this.setState({mealArrayFiltered: this.state.mealArray});
            return;
        }

        const mealArrayFiltered = search(searchTerm, this.state.mealArray, ['name']);
        this.setState({mealArrayFiltered});
    }

    generateHoursMessage = (mealType) => {
        const name = this.props.menusList.data.location;
        const location = this.props.diningHallsList.dataObject[name];
        const mealTimes = location.todayHours[mealType];

        const openingTime = mealTimes.openingTime;
        const closingTime = mealTimes.closingTime;
        const transferTime = mealTimes.transferTime;

        return `open from ${openingTime} to ${closingTime}` + ((transferTime && ` (transfers at ${transferTime})`) || "");
    }

    dynamicTabButtons = () => {
        const menu = this.props.menusList.data;
        const mealTypes = Object.keys(menu.today);
        const formatted = {
            contBreakfast: "Cont. Breakfast",
            hotBreakfast: "Hot Breakfast",
            brunch: "Brunch",
            lunch: "Lunch",
            dinner: "Dinner"
        }

        let tabButtons = mealTypes.map(mealType => {
            return {
                tabName: formatted[mealType],
                function: () => {
                    const mealArray = this.props.menusList.data.today[mealType];
                    const mealArrayFiltered = mealArray;
                    const hoursMessage = this.generateHoursMessage(mealType);
                    this.setState({ mealArray, mealArrayFiltered, hoursMessage })
                }
            }
        })

        return tabButtons;
    }

    render() {
        const hasLoadedSuccessfully = !this.props.menusList.isLoading && !this.props.menusList.hasError
        const hasLoadedFailed = !this.props.menusList.isLoading && this.props.menusList.hasError;
        return (
            <View style={{ flex: 1 }}>
                {hasLoadedSuccessfully &&
                    <View style={{ flex: 1 }}>
                        <Header canGoBack title={this.props.menusList.data.location} />
                        <Searchbar autoUpdate onSearch={this.performSearch} />
                        <TopTabs tabButtons={this.dynamicTabButtons()} />
                        <Text style={{ 
                            ...styles.font.type.primaryRegular, 
                            ...styles.font.color.primary, 
                            textAlign: 'center' 
                        }}>{this.state.hoursMessage}</Text>
                        {this.state.mealArrayFiltered && 
                            <View style={{paddingBottom: 50, flex: 1}}>
                                <DV2ScrollView
                                    array={this.state.mealArrayFiltered}
                                    render={(dish) => this.renderMenu(dish)}
                                />
                            </View>
                        }
                    </View>
                }
                {hasLoadedFailed &&
                    <View style={{flex: 1}}>
                        <Header canGoBack title="Server Error" />
                        <View style={{paddingBottom: 50, flex: 1}}>
                            <CenterTextView message="No menu data available :(" />
                        </View>
                    </View>
                }
                <BottomTabs viewName={"MenuView"} />
            </View>
        )
    }

    renderMenu = (dish) => {
        return (
            <TouchableOpacity
                key={dish.name}
                onPress={() => {
                    this.props.getMenuItemInformation(dish.itemID);
                    this.props.navigation.navigate('MenuItemView');
                }}
            >
                <ListItem title={dish.name} />
            </TouchableOpacity>
        );
    }
}

export default connectToRedux(MenuView, ['menusList', 'diningHallsList']);