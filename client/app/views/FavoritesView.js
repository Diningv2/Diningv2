import React, { Component } from 'react';
import { View } from 'react-native';
import connectToRedux from '../redux/lib/connectToRedux';
import sp from '../redux/lib/stateProperties';
import CenterTextView from '../components/CenterTextView';
import Dish from '../components/Dish';
import { DV2ScrollView } from '../components/DV2ScrollView';
import Header from '../components/Header';
import TopTabs from '../components/TopTabs';
import ItemCard from '../components/ItemCard';
import { LoadingIndicator } from '../components/LoadingIndicator';

class FavoritesView extends Component {

    constructor(props) {
        super(props);
    }

    favoritesTabButtons = [
        {tabName: "Served Today", function: () => console.log("LOL")},
        {tabName: "All Favorites", function: () => console.log("OKAY LOL")}
    ]

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title="Favorites" />
                <TopTabs tabButtons={this.favoritesTabButtons} />
                <View style={{margin: 10}}>
                    <ItemCard />
                </View>
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
            return <LoadingIndicator />
        } else if (this.props.favoritesList.data == undefined || Object.keys(this.props.favoritesList.data).length == 0) { // No faves
            return (
                <View style={{flex: 1}}>
                    <CenterTextView message="No favorites to show" />
                </View>
            );
        }
        return (
            <View style={{flex: 1}}>
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