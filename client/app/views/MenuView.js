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
                        <View style={{...styles.container.withPadding}}>
                        {this.props.menusList.isLoading  
                                ? <Text>Loading...</Text>
                                : this.getItemsList()  
                            }
                        </View>
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


  
    getItemsList () {
        //TODO: Clean up reused code
        //TODO: make sure navigation works here
        if (this.state.selectedTabName == 'Dinner') {
            return this.props.menusList.data.today.dinner.map((dish, index) => {
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
                            this.props.navigation.navigate('MenuItemView');
    
                        }} 
                    >
                        <ListItem title={dish.name} />
                    </TouchableOpacity>
                )
            })
        }

        if (this.state.selectedTabName == 'Breakfast') {
            //TODO: Different menus for contBreakfast vs hotBreakfast vs Brunch
            const keys = Object.keys(this.props.menusList.data.today);
            if (keys.includes('hotBreakfast')) {
                return this.props.menusList.data.today.hotBreakfast.map((dish, index) => {
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
                    )
                })
            }
            if (keys.includes('contBreakfast')) {
                return this.props.menusList.data.today.contBreakfast.map((dish, index) => {
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
                    )
                })
            }
            
        }
        
    }
}

export default connectToRedux(MenuView, ['menusList']);