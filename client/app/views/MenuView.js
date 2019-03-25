import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Alert, Text } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

import connectToRedux from '../redux/lib/connectToRedux';
import sp from '../redux/lib/stateProperties';

import Header from '../components/Header';
import ListItem from '../components/ListItem';
import BottomTabs from '../components/BottomTabs';
import TopTabs from '../components/TopTabs';
import {DV2ScrollView} from '../components/DV2ScrollView';

import styles from '../config/styles';

class MenuView extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        mealArray: undefined
    }

    dynamicTabButtons = () => {
        const menu = this.props.menusList.data;
        const mealTypes = Object.keys(menu.today);
        const formatted = {
            contBreakfast: "Cont. Breakfast",
            hotBreakfast: "Hot Breakfast",
            lunch: "Lunch",
            dinner: "Dinner"
        }

        let tabButtons = mealTypes.map(mealType => {
            return {
                tabName: formatted[mealType],
                function: () => {
                    const mealArray = this.props.menusList.data.today[mealType];
                    this.setState({ mealArray: mealArray })
                }
            }
        })

        return tabButtons;
    }

    render() {
        return (
            <View style={{flex: 1}}>
            {!this.props.menusList.isLoading && 
                <View>
                    <Header canGoBack title={this.props.menusList.data.location} /> 
                    <ScrollView>
                        <TopTabs tabButtons={this.dynamicTabButtons()}/>
                        {this.state.mealArray && <Transition appear="bottom">
                            <DV2ScrollView 
                                style={{flex: 1}}
                                array={this.state.mealArray}
                                render={(dish) => this.renderMenu(dish)} 
                            />
                        </Transition>}
                    </ScrollView>
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

export default connectToRedux(MenuView, ['menusList']);