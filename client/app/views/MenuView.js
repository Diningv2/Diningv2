import React, { Component } from 'react';
import { View, Text } from 'react-native';

import connectToRedux from '../redux/lib/connectToRedux';
import sp from '../redux/lib/stateProperties';
import { search } from '../lib/search-utility'; // We took out the search bar for now due to interesting search results

import { DV2ScrollView } from '../components/DV2ScrollView';
import CenterTextView from '../components/CenterTextView';
import Dish from '../components/Dish';
import Header from '../components/Header';
import TopTabs from '../components/TopTabs';

import styles from '../config/styles';
import formattedMealTypes from '../config/formattedMealTypes';
import { AnimatedListItem } from '../components/Animatable';
import { LoadingIndicator } from '../components/LoadingIndicator';

/** Renders the menu for a given DHall, with today/tomorrow and meal top tabs */
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

    /** Need to call performSearch with the new search term when a top tab is 
    pressed, so we need to keep a local state of the search  */
    updateSearchTerm = (searchTerm) => {
        this.setState({ searchTerm: searchTerm });
    }

    /** Calls on the search utility to perform a search of
     * the meals array and sets a newly-filtered meal array
     * given the search term
     */
    performSearch = (searchTerm) => {
        // If the search term is empty, just output everything
        if (searchTerm.trim() == "") {
            this.setState({
                mealArrayFiltered: this.state.mealArray
            });
        } else { // Otherwise do an actual search on the array
            const mealArrayFiltered = search(searchTerm, this.state.mealArray, ['name']);
            this.setState({ mealArrayFiltered });
        }
    }

    /** Generates the message for the hours that dining hall
    is open for the given meal type */
    generateHoursMessage = (mealType) => {
        const name = this.props.menusList.data.location;
        const location = this.props.diningHallsList.dataObject[name];    
        // json in redux has info for all meals, get hours for selected day and meal tabs 
        const mealTimes = this.state.selectedDay == 'Today' ? location.todayHours[mealType] : location.tomorrowHours[mealType];

        const openingTime = mealTimes.openingTime;
        const closingTime = mealTimes.closingTime;
        const transferTime = mealTimes.transferTime;

        return `open from ${openingTime} to ${closingTime}` + ((transferTime && ` (transfers at ${transferTime})`) || "");
    }

    /** Initializes the buttons on the Today/Tomorrow top tabs
    and the corresponding functions when you press
    the buttons on top tabs */
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
                    // Introducing async will let the view finish rendering
                    // before executing this
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
        });
        return tabs;
    }

    /** Dynamically sets the header text based on
    the success and fail conditions of this page load */
    setHeaderText = (successCondition, failCondition) => {
        if (successCondition) {
            const diningHallName = this.props.menusList.data.location;
            return diningHallName;
        }
        if (failCondition)
            return "Server Error";

        // Otherwise the text will stay as "Loading..."
        return "Loading...";
    }

    /** Dynamically sets the buttons on the Breakfast/Lunch/Dinner top tabs
    // and the corresponding functions when you press
    // the tabs' buttons */
    dynamicTabButtons = () => {
        const menu = this.props.menusList.data;
        const day = this.state.selectedDay == 'Today' ? menu.today : menu.tomorrow;
        
        const mealTypes = Object.keys(formattedMealTypes).filter(
            mealType => day[mealType] && day[mealType].length
        );
        let tabButtons = mealTypes.map(mealType => {
            return {
                tabName: formattedMealTypes[mealType],
                function: () => {
                    const mealArray = this.state.selectedDay == 'Today' 
                        ? this.props.menusList.data.today[mealType] 
                        : this.props.menusList.data.tomorrow[mealType];
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
        });

        return tabButtons;
    }

    /** Renders the menu view with top tabs delineating Today/Tomorrow
     * Breakfast/Lunch/Dinner and then the corresponding menu items for each
     * meal and day.
     */
    render() {
        const { menusList } = this.props;
        const hasLoadedSuccessfully = !menusList.isLoading && !menusList.hasError;
        const hasLoadedFailed = !menusList.isLoading && menusList.hasError;

        return (
            <View style={{ flex: 1 }}>
            <Header canGoBack title={this.setHeaderText(hasLoadedSuccessfully, hasLoadedFailed)} />
                {hasLoadedSuccessfully &&
                    <View style={{ flex: 1 }}>
                        <AnimatedListItem key="toptabs" index={3}>
                            <View style={{...styles.container.withPaddingTop}}>
                                <TopTabs tabButtons={this.dayTabButtons()} />
                            </View>
                            {this.renderDynamicTabs()}
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
                            <LoadingIndicator />
                            :
                            <View style={{ flex: 1 }}>
                                {this.state.mealArrayFiltered && this.state.mealArrayFiltered.length > 0 
                                    ?
                                    <DV2ScrollView
                                        array={this.state.mealArrayFiltered}
                                        render={(dish, index) => this.renderMenu(dish, index)}
                                    />
                                    :
                                    <View style={{ flex: 1 }}>
                                        <CenterTextView message="No menu items to show." />
                                    </View>
                                }
                            </View>
                        }
                    </View>
                }
            </View>
        );
    }

    formatted = {
        Alcohol: "alcohol",
        Nuts: "nuts",
        Shellfish: "shellfish",
        Peanut: "peanut",
        Dairy: "dairy",
        Eggs: "eggs",
        Pork: "pork",
        'Fish/Seafood': "fishSeafood",
        Soy: "soy",
        Wheat: "wheat",
        Gluten: "gluten"
    }

    /** Check user filter preferences vs dish's allergens */
    isFiltered = (dish) => {
        const filters = this.props.filtersList.data;
        if (filters.Vegetarian && !dish.isVegetarian) {
            return true;
        }
        if (filters.GlutenFree && !dish.isGlutenFree) {
            return true;
        }
        if (filters.Vegan && !dish.isVegan) {
            return true;
        }
        else {
            for (var index = 0; index < dish.allergens.length; index++) {
                if (filters[this.formatted[dish.allergens[index]]]){
                    return true;
                } 
            }
        }
        return false;
    }

    /** Shows the meal tabs if there are any available, otherwise shows nothing. */
    renderDynamicTabs() {
        const tabs = this.dynamicTabButtons();
        return (tabs.length == 0 
            ? (
                <View style={{...styles.container.withPaddingBottom}} />
            ) : (
                <View style={{
                    paddingTop: 2, 
                    ...styles.container.withPaddingBottom
                }}>
                    <TopTabs tabButtons={this.dynamicTabButtons()} />
                </View>
            )
        );
    }

    /** Renders a given dish in the ScrollView
     * (The index variable is used to modulate the
     * delay time on the AnimatedListItem component)
     */
    renderMenu = (dish, index) => {
        const filtered = this.isFiltered(dish);
        return (
            <AnimatedListItem key={dish.name} index={index}>
                <Dish key={dish.name} dish={dish} filtered={filtered}/>
            </AnimatedListItem>
        );
    }
}

export default connectToRedux(MenuView, [sp.menusList, sp.diningHallsList, sp.filtersList]);
