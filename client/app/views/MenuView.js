import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';

import connectToRedux from '../redux/lib/connectToRedux';
import { search } from '../lib/search-utility';

import { DV2ScrollView } from '../components/DV2ScrollView';
import BottomTabs from '../components/BottomTabs';
import CenterTextView from '../components/CenterTextView';
import Dish from '../components/Dish';
import SearchableHeader from '../components/SearchableHeader';
import Header from '../components/Header';
import Searchbar from '../components/Searchbar';
import TopTabs from '../components/TopTabs';

import styles from '../config/styles';
import { AnimatedListItem } from '../components/Animatable';

class MenuView extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        mealArray: undefined,
        mealArrayFiltered: undefined,
        searchTerm: "",
        hoursMessage: "",
        selectedDay: 'Today',
        meal: ''
    }

    // We need to call performSearch with the new
    // search term when a top tab is pressed,
    // so we need to keep a local state of the search term
    updateSearchTerm = (searchTerm) => {
        this.setState({ searchTerm: searchTerm });
    }

    performSearch = (searchTerm) => {
        // If the search term is empty
        // just output everything
        if (searchTerm.trim() == "") {
            this.setState({
                mealArrayFiltered: this.state.mealArray
            })
            // Otherwise do an actual search on the array
        } else {
            const mealArrayFiltered = search(searchTerm, this.state.mealArray, ['name']);
            this.setState({ mealArrayFiltered });
        }
    }

    generateHoursMessage = (mealType) => {
        const name = this.props.menusList.data.location;
        const location = this.props.diningHallsList.dataObject[name];     
        const mealTimes = this.state.selectedDay == 'Today' ? location.todayHours[mealType] : location.tomorrowHours[mealType];

        const openingTime = mealTimes.openingTime;
        const closingTime = mealTimes.closingTime;
        const transferTime = mealTimes.transferTime;

        return `open from ${openingTime} to ${closingTime}` + ((transferTime && ` (transfers at ${transferTime})`) || "");
    }

    //Functions for day tabs
    dayTabButtons = () => {

        const dayTypes = ["today", "tomorrow"];
        const formatted = {
            today: "Today",
            tomorrow: "Tomorrow"
        }

        const tabs = dayTypes.map(dayType => {
            return {
                tabName: formatted[dayType],
                function: () => {
                    // Start loading indicator
                    this.setState({ isLoading: true });

                    // Run after 200ms to let tab change colors immediately
                    setTimeout(() => {
                        this.setState({
                            selectedDay: formatted[dayType],
                            mealArray: this.props.menusList.data[dayType][this.state.meal],
                            mealArrayFiltered: this.props.menusList.data[dayType][this.state.meal]
                        }, () => {
                            // Stop loading after the new state is ready
                            this.setState({ isLoading: false })
                        })
                    }, 500)
                }
            }
        })
        return tabs;
    }


    dynamicTabButtons = () => {
        const menu = this.props.menusList.data;
        const day = this.state.selectedDay == 'Today' ? menu.today : menu.tomorrow;
        const mealTypes = Object.keys(day);

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
                    const mealArray = this.state.selectedDay == 'Today' ? this.props.menusList.data.today[mealType] : this.props.menusList.data.tomorrow[mealType];
                    const mealArrayFiltered = mealArray;
                    const hoursMessage = this.generateHoursMessage(mealType);

                    // Start loading indicator
                    this.setState({ isLoading: true })

                    // Run after 200ms to let tabs change color on press
                    setTimeout(() => {
                        this.setState({
                            mealArray,
                            mealArrayFiltered,
                            hoursMessage,
                            meal: mealType
                        }, () => {
                            this.performSearch(this.state.searchTerm);
                            this.setState({ isLoading: false })
                        })
                    }, 500);
                }
            }
        })

        return tabButtons;
    }

    render() {
        const hasLoadedSuccessfully = !this.props.menusList.isLoading && !this.props.menusList.hasError;
        const hasLoadedFailed = !this.props.menusList.isLoading && this.props.menusList.hasError;
        return (
            <View style={{ flex: 1 }}>
                {hasLoadedSuccessfully &&
                    <View style={{ flex: 1 }}>
                        <SearchableHeader canGoBack title={!hasLoadedSuccessfully ? 'Loading...' : this.props.menusList.data.location} />
                        {/* <AnimatedListItem key="searchbar" index={0}>
                            <Searchbar autoUpdate onSearch={this.performSearch} onChangeText={this.updateSearchTerm} />
                        </AnimatedListItem> */}
                        <AnimatedListItem key="toptabs" index={3}>
                            <TopTabs tabButtons={this.dayTabButtons()} />
                            <TopTabs tabButtons={this.dynamicTabButtons()} />
                        </AnimatedListItem>
                        {!this.state.isLoading &&
                            <AnimatedListItem key="hourstext" index={4}>
                                <Text style={{
                                    ...styles.font.type.primaryRegular,
                                    ...styles.font.color.primary,
                                    textAlign: 'center'
                                }}>{this.state.hoursMessage}</Text>
                            </AnimatedListItem>
                        }
                        {this.state.isLoading
                            ?
                            <CenterTextView message="Loading..." />
                            :
                            <View style={{ paddingBottom: 50, flex: 1 }}>
                                {this.state.mealArrayFiltered ?
                                    <DV2ScrollView
                                        array={this.state.mealArrayFiltered}
                                        render={(dish, index) => this.renderMenu(dish, index)}
                                    />
                                    :
                                    <View style={{ paddingBottom: 50, flex: 1 }}>
                                        <CenterTextView message="No menu items to show." />
                                    </View>
                                }
                            </View>
                        }
                    </View>
                }
                {hasLoadedFailed &&
                    <View style={{ flex: 1 }}>
                        <Header canGoBack title="Server Error" />
                        <View style={{ paddingBottom: 50, flex: 1 }}>
                            <CenterTextView message="No menu data available :(" />
                        </View>
                    </View>
                }

                <BottomTabs viewName={"MenuView"} />
            </View>
        )
    }

    renderMenu = (dish, index) => {
        return (
            <AnimatedListItem key={dish.name} index={index}>
                <Dish key={dish.name} dishName={dish.name} dishID={dish.itemID} />
            </AnimatedListItem>
        );
    }
}

export default connectToRedux(MenuView, ['menusList', 'diningHallsList']);
