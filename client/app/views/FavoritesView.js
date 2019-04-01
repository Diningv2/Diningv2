import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

import styles from '../config/styles';

import connectToRedux from '../redux/lib/connectToRedux';

import DiningHallItem from '../components/DiningHallItem';
import { DV2ScrollView } from '../components/DV2ScrollView';
import Header from '../components/Header';
import dHallIDs from '../config/dHallIDs';
import BottomTabs from '../components/BottomTabs';

class FavoritesView extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // if (this.props.favoritesList.isLoading) {
        //     this.props.getFavoritesInformation();
        // }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title="Favorites" />
                {this.props.favoritesList.isLoading
                    ? (
                        <Transition appear="bottom">
                            <View style={{ ...styles.container.center }}>
                                <Text style={{ 
                                    ...styles.font.type.primaryRegular, 
                                    ...styles.font.color.primary 
                                }}>Loading...</Text>
                            </View>
                        </Transition>
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