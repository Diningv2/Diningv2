
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

import connectToRedux from '../redux/lib/connectToRedux';
import sp from '../redux/lib/stateProperties';

import Header from '../components/Header';
import ListItem from '../components/ListItem';
import BottomTabs from '../components/BottomTabs';
import TopTabs from '../components/TopTabs';

import styles from '../config/styles';

class IngredientsView extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // TODO: Check which dhall you're in from Redux state and 
        // pass in appropriate location ID - maybe have global mapping
        // this.props.getMenus(1); 
        // Maybe nothing here if taken care of on the onPress before
    }

    

    render() {
        return (
            <View style={{flex: 1}}>
            
            { !this.props.menuItem.isLoading && 
                <View>
                <Header title={this.props.menuItem.data.name} /> 

                <Transition appear="bottom">
                    <ScrollView>
                    {this.props.menuItem.data.ingredients.map(ingredient => {
                        return (
                        <ListItem key={ingredient.name} title={ingredient} />
                        )
                                })}

                    </ScrollView>
                </Transition>
                <BottomTabs viewName={'IngredientsView'}/>
                
                </View>
            }
            </View>
        )
    }

    getIngredientsList() {
        return this.props.menuItem.ingredients.map((ingredient, index) => {
            return (
                <TouchableOpacity 
                    key={ingredient}
                    
                    onPress={() => {
                        // TODO: Set redux state that we're viewing dish.index 
                        //this.props.getMenus(index+1); // Set redux state with menu for this dHall
                        //this.props.navigation.navigate('MenuView');
                        // this.props.getMenuItemInformation(index);
                        // this.props.navigation.navigate('IngredientsView');

                    }} 
                >
                    <ListItem title={ingredient} />
                </TouchableOpacity>
            )
        })
    }
}

export default connectToRedux(IngredientsView, ['menuItem']);