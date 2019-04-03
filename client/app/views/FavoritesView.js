import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

import styles from '../config/styles';

import connectToRedux from '../redux/lib/connectToRedux';

import { DV2ScrollView } from '../components/DV2ScrollView';
import BottomTabs from '../components/BottomTabs';
import CenterTextView from '../components/CenterTextView';
import Dish from '../components/Dish';
import Header from '../components/Header';

class FavoritesView extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.favoritesList.isLoading) {
            this.props.getFavorites(0);
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title="Favorites" />
                {this.props.favoritesList.isLoading
                    ? (
                        <CenterTextView message="Loading..." />
                    ) : (
                        <View style={{paddingBottom: 50, flex: 1}}>
                            <DV2ScrollView 
                                array={this.props.favoritesList.data}
                                render={(dish) => this.renderFavesList(dish)}
                            />
                        </View>
                    )
                }
                <BottomTabs viewName={"FavoritesView"} />
            </View>
        );
    }

    renderFavesList = (dish) => {
        return (
            <Dish key={dish.name} dishName={dish.name} dishID={dish.itemID} />
        );
    }
}

export default connectToRedux(FavoritesView, ['favoritesList']);