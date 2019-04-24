import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../../components/Header';
import TopTabs from '../../components/TopTabs';
import connectToRedux from '../../redux/lib/connectToRedux';
import sp from '../../redux/lib/stateProperties';

import CenterTextView from '../../components/CenterTextView';
import LoadingIndicator from '../../components/LoadingIndicator';
import FavoritesListAll from './FavoritesListAll';
import FavoritesListServedToday from './FavoritesListServedToday';
import styles from '../../config/styles';

class MainView extends Component {

    constructor(props) {
        super(props);
    }

    // Tab names in the Favorites View
    servedToday = "Served Today";
    allFavorites = "All Favorites";

    // View starts out on the "Served Today" tab
    state = {
        selectedTab: this.servedToday
    }

    // Tab buttons will set the selectedTab state to the correct tab on press
    favoritesTabButtons = [this.servedToday, this.allFavorites].map(tabName => {
        return {tabName: tabName, function: () => this.setState({selectedTab: tabName})}
    })

    displayContent = () => {
        if (!this.props.userInformation.notificationID) { // No permission for notifications
            return (
                <CenterTextView 
                    message="Enable push notifications to allow you to favorite dishes!" 
                />
            );
        } else if (this.props.favoritesList.isLoading) {
            return <LoadingIndicator />
        } else if ( // No faves
            this.props.favoritesList.data == undefined 
            || Object.keys(this.props.favoritesList.data).length == 0
        ) { 
            return (
                <View style={{flex: 1}}>
                    <CenterTextView message={
                        "Looks like you don't have any favorites yet. "
                        + "Go into the dining hall menus and tap on some "
                        + "hearts to favorite dishes!"} 
                    />
                </View>
            );
        } else {
            return (
            <View style={{ flex: 1}}>
                <View style={{...styles.topTabs.withPaddingTop}}>
                    <TopTabs tabButtons={this.favoritesTabButtons} />
                </View>
                {this.state.selectedTab == this.allFavorites &&
                    <FavoritesListAll />
                }
                {this.state.selectedTab == this.servedToday &&
                    <FavoritesListServedToday /> 
                }
            </View>
            )
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title="Favorites" />
                {this.displayContent()}
            </View>
        );
    }

}

export default connectToRedux(MainView, [sp.favoritesList, sp.userInformation]);