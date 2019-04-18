import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

import styles from '../config/styles';

import connectToRedux from '../redux/lib/connectToRedux';
import sp from '../redux/lib/stateProperties';

import { DV2ScrollView } from '../components/DV2ScrollView';
import BottomTabs from '../components/BottomTabs';
import CenterTextView from '../components/CenterTextView';
import Dish from '../components/Dish';
import Header from '../components/Header';

class FavoritesView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title="Favorites" />
                {this.renderContent()}
            </View>
        );
    }

    renderContent() {
        if (!this.props.userInformation.notificationID) { // No permission for notifications
            return (
                <CenterTextView 
                    message="Enable push notifications to allow you to favorite dishes!" 
                />
            );
        } else if (this.props.favoritesList.isLoading) {
            return <CenterTextView message="Loading..." />;
        } else if (this.props.favoritesList.data == {} || this.props.favoritesList.data == undefined) { // No faves
            return (
                <View style={{paddingBottom: 50, flex: 1}}>
                    <CenterTextView message="No favorites to show" />
                </View>
            );
        }
        return (
            <View style={{paddingBottom: 50, flex: 1}}>
                <DV2ScrollView 
                    array={Object.keys(this.props.favoritesList.data)}
                    render={(dishID) => this.renderFavesList(dishID)}
                />
            </View>
        );
    }



    renderFavesList = (dishID) => {
        const dishName = this.props.favoritesList.data[dishID];
        return (
            <Dish key={dishName} dishName={dishName} dishID={dishID} />
        );
    }
}

export default connectToRedux(FavoritesView, [sp.favoritesList, sp.userInformation]);