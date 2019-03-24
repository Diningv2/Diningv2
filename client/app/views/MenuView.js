
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

    handleAlert(title, msg){
        // Works on both iOS and Android
        Alert.alert(
          title,
          msg,
          [
            {text: 'OK', onPress: () => console.log(title+' Pressed')}
          ],
          {cancelable: false},
        );
    }

    f1 = ()=>this.handleAlert('f1', 'Pressed f1');
    f2 = ()=>this.handleAlert('f2', 'Pressed f2');
    f3 = ()=>this.handleAlert('f3', 'Pressed f3');


    tabButtons = [
        {
          tabName: 'Tab1',
          function: this.f1
        },
        {
          tabName: 'Tab2',
          function: this.f2
        },
        {
          tabName: 'Tab3',
          function: this.f3
        }
    ]

    render() {
        return (
            <View style={{flex: 1}}>
            
            { !this.props.menusList.isLoading && 
                <View>
                <Header title={this.props.menusList.data.location} /> 
                <TopTabs tabButtons={this.tabButtons}/>

                <Transition appear="bottom">
                    <ScrollView>
                        {this.props.menusList.isLoading 
                            ? <Text>Loading...</Text>
                            : this.getItemsList() 
                        }
                    </ScrollView>
                </Transition>
                <BottomTabs viewName={'MenuView'}/>
                
                </View>
            }
            </View>
        )
    }

    getItemsList() {
        return this.props.menusList.data.today.dinner.map((dish, index) => {
            return (
                <TouchableOpacity 
                    key={dish.name}
                    
                    onPress={() => {
                        // TODO: Set redux state that we're viewing dish.index 
                        //this.props.getMenus(index+1); // Set redux state with menu for this dHall
                        //this.props.navigation.navigate('MenuView');
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

export default connectToRedux(MenuView, ['menusList']);