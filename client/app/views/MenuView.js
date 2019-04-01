import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';

import connectToRedux from '../redux/lib/connectToRedux';

import Header from '../components/Header';
import ListItem from '../components/ListItem';
import TopTabs from '../components/TopTabs';
import { DV2ScrollView } from '../components/DV2ScrollView';

import styles from '../config/styles';

class MenuView extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        mealArray: undefined,
        hoursMessage: ""
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
                    const hoursMessage = this.generateHoursMessage(mealType);
                    this.setState({ mealArray, hoursMessage })
                }
            }
        })

        return tabButtons;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {!this.props.menusList.isLoading &&
                    <View>
                        <Header canGoBack title={this.props.menusList.data.location} />
                        <TopTabs tabButtons={this.dynamicTabButtons()} />
                        <Text style={{ ...styles.font.type.primaryRegular, ...styles.font.color.primary, textAlign: 'center' }}>{this.state.hoursMessage}</Text>
                        {this.state.mealArray && <View>
                            <DV2ScrollView
                                style={{ flex: 1 }}
                                array={this.state.mealArray}
                                render={(dish) => this.renderMenu(dish)}
                            />
                        </View>}
                    </View>
                }
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