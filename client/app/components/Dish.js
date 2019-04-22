import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import connectToRedux from '../redux/lib/connectToRedux';
import sp from '../redux/lib/stateProperties';

import AntDesign from '@expo/vector-icons/AntDesign';
import styles, { colors } from '../config/styles';
import { post } from '../lib/api-utility';
import { ScaleInOut } from './Animatable';

export class Dish extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        isFave: false,
        isLoading: false
    }

    componentDidMount() {
        // TODO: Check if this item is a favorite
        const { data } = this.props.favoritesList;
        const isFave = data && data[this.props.dish.itemID] || false;
        this.setState({ isFave });
    }

    dishStyle = {
        ...styles.container.spaceBelowSmall,
        ...styles.container.flexRow,
        ...styles.container.dropShadowSmall,
        justifyContent: 'space-between',
        backgroundColor: colors.secondary,
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 15
    }

    filteredDishStyle = {
        ...styles.container.spaceBelowSmall,
        ...styles.container.flexRow,
        ...styles.container.dropShadowSmall,
        justifyContent: 'space-between',
        backgroundColor: '#D0D1D8',
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 15
    }

    handlePress = async () => {
        // TODO: change the favorited status of the dish
        const token = this.props.userInformation.notificationID;
        const menuitemid = this.props.dish.itemID;
        const name = this.props.dish.name;
        const postConfig = {
            token,
            menuitemid,
            name
        }
        const previousState = this.state.isFave;

        // If the heart is full, do remove favorite
        // If the heart is empty, do add favorite
        try {
            if (this.state.isFave) {
                this.setState({ isFave: false });
                await post('/api/favorites/delete', postConfig);
                this.props.removeFavorite(menuitemid);
            } else {
                this.setState({ isFave: true });
                await post('/api/favorites', postConfig);
                this.props.addFavorite(menuitemid, name);
            }

        } catch (e) {
            console.error("Favorite add/remove error", e.message);
            this.setState({ isFave: previousState });
        }
    }

    render() {
        return (
            <ScaleInOut pose={this.state.isLoading ? 'exit' : 'enter'}>
                <View style={this.props.filtered ? this.filteredDishStyle : this.dishStyle}>
                    <TouchableOpacity
                        style={{ width: '80%' }}
                        onPress={() => {
                            this.props.getMenuItemInformation(this.props.dish);
                            this.setState({ isLoading: true })
                            setTimeout(() => {
                                this.props.navigation.navigate('MenuItemView');
                                this.setState({ isLoading: false });
                            }, 100);
                        }}
                    >
                        <Text style={{ ...styles.font.type.primaryRegular, ...styles.font.size.medium }}>
                            {this.props.dish.name}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handlePress}>
                        <AntDesign
                            name={this.state.isFave ? 'heart' : 'hearto'}
                            size={25}
                            color={'#ff6666'}
                        />
                    </TouchableOpacity>
                </View>
            </ScaleInOut>
        );
    }
}

export default connectToRedux(withNavigation(Dish), [sp.userInformation, sp.favoritesList]);