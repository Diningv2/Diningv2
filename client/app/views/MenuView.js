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
        // TODO: This should be based on time of day. Also, issues with back btn.
        selectedTabName: 'Lunch',
    };
 
    // tabButtons = !this.props.menusList.isLoading && Object.keys(this.props.menusList.data.today).map(meal => {
    //     return {tabName: meal, function: () => this.setState({selectedTabName: meal, meal: meal})}
    // })

    setBreakfast = () => this.setState({selectedTabName: 'Breakfast'});
    setLunch = () => this.setState({selectedTabName: 'Lunch'});
    setDinner = () => this.setState({selectedTabName: 'Dinner'});

    tabButtons = [
        {
          tabName: 'Breakfast',
          function: this.setBreakfast
        },
        {
          tabName: 'Lunch',
          function: this.setLunch
        },
        {
          tabName: 'Dinner',
          function: this.setDinner
        }
    ] 

    render() {
        return (
            <View style={{flex: 1}}>
            {!this.props.menusList.isLoading && 
                <View>
                    <Header canGoBack title={this.props.menusList.data.location} /> 
                    <ScrollView>
                        <TopTabs tabButtons={this.tabButtons}/>
                        <Transition appear="bottom">
                            <DV2ScrollView 
                                style={{flex: 1}}
                                array={this.getMealArray()}
                                render={(dish) => this.renderMenu(dish)} 
                            />  
                        </Transition>
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

    getMealArray() {
        switch(this.state.selectedTabName) {
            case 'Dinner':
                return this.props.menusList.data.today.dinner;
                break;
            case 'Lunch':
                return this.props.menusList.data.today.lunch;
                break;
            case 'Breakfast':
                const keys = Object.keys(this.props.menusList.data.today);
                if (keys.includes('hotBreakfast')) {
                    return this.props.menusList.data.today.hotBreakfast;
                    break;
                } else {
                    return this.props.menusList.data.today.contBreakfast;
                    break;
                }
        }
    }
  
}

export default connectToRedux(MenuView, ['menusList']);