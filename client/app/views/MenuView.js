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

    componentDidMount() {
        // TODO: Check which dhall you're in from Redux state and 
        // pass in appropriate location ID - maybe have global mapping
        // this.props.getMenus(1); 
        // Maybe nothing here if taken care of on the onPress before
    }

    renderMenuItem = (menuItem, index) => {
        console.log(menuItem.name);
        return (
            <TouchableOpacity 
                key={menuItem.name}
                onPress={() => {
                    // this.props.getMenus(index+1); // Set redux state with menu for this dHall
                    // this.props.navigation.navigate('MenuView');
                    console.log("Sanity");
                }}  
            >

                <ListItem title={menuItem.name}/>
            </TouchableOpacity>
        )
    }

    state = {
        selectedTabName: 'Dinner',
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
            
            { !this.props.menusList.isLoading && 
                <View>
                    <Header canGoBack title={this.props.menusList.data.location} /> 

                    <Transition appear="bottom">
                        <ScrollView>
                        <TopTabs tabButtons={this.tabButtons}/>
                        {this.props.menusList.isLoading  
                                ? <Text>Loading...</Text>
                                : this.getItemsList()  
                            }
                        </ScrollView>
                        {/* <DV2ScrollView style={{flex: 1}}
                            array={this.props.menusList.data.today.dinner}
                            render={(element, index) => this.renderMenuItem(element, index)} 
                        /> */}
                        
                    </Transition>
                     
                </View>
            }
            </View>
        )
    }


 
    getItemsList (meal) {
        if (this.state.selectedTabName == 'Dinner') {
            return this.props.menusList.data.today.dinner.map((dish, index) => {
                return (
                    <TouchableOpacity 
                        key={dish.name}
                        
                        onPress={() => {
                           
                            this.props.getMenuItemInformation(dish.itemID);
                            this.props.navigation.navigate('IngredientsView');
    
                        }} 
                    >
                        <ListItem title={dish.name} />
                    </TouchableOpacity>
                )
            })
        }

        if (this.state.selectedTabName == 'Lunch') {
            return this.props.menusList.data.today.lunch.map((dish, index) => {
                return (
                    <TouchableOpacity 
                        key={dish.name}
                        
                        onPress={() => {
                           
                            this.props.getMenuItemInformation(dish.itemID);
                            this.props.navigation.navigate('IngredientsView');
    
                        }} 
                    >
                        <ListItem title={dish.name} />
                    </TouchableOpacity>
                )
            })
        }

        if (this.state.selectedTabName == 'Breakfast') {
            //TODO: Different menus for contBreakfast vs hotBreakfast vs Brunch
            return this.props.menusList.data.today.contBreakfast.map((dish, index) => {
                return (
                    <TouchableOpacity 
                        key={dish.name}
                        
                        onPress={() => {
                           
                            this.props.getMenuItemInformation(dish.itemID);
                            this.props.navigation.navigate('IngredientsView');
    
                        }} 
                    >
                        <ListItem title={dish.name} />
                    </TouchableOpacity>
                )
            })
        }
        
    }
}

export default connectToRedux(MenuView, ['menusList']);