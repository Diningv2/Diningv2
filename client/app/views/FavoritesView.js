import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

import styles from '../config/styles';

import connectToRedux from '../redux/lib/connectToRedux';

import DiningHallItem from '../components/DiningHallItem';
import { DV2ScrollView } from '../components/DV2ScrollView';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import dHallIDs from '../config/dHallIDs';
import BottomTabs from '../components/BottomTabs';
import CenterTextView from '../components/CenterTextView';

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
                        <View>
                            <DV2ScrollView style={{ flex: 1 }}
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

export default connectToRedux(FavoritesView, ['favoritesList']);