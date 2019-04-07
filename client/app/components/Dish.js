import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import connectToRedux from '../redux/lib/connectToRedux';
import sp from '../redux/lib/stateProperties';

import AntDesign from '@expo/vector-icons/AntDesign';
import styles from '../config/styles';
import { post } from '../lib/api-utility';

export class Dish extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        isFave: false,
    }

    componentDidMount() {
        // TODO: Check if this item is a favorite
        isFaveDish = false; // TODO: remove this line

        if (isFaveDish) {
            this.setState({ isFave: true });
        };
    }

    toggleFavorite = async () => {
        const token = this.props.userInformation.notificationID;
        const menuitemid = this.props.dishID;

        try {
            // TODO: Change to being dealt with Redux props
            if (this.state.isFave) {
                await post('/api/favorites', {
                    token, menuitemid
                })
            } else {
                await post('/api/favorites/delete', {
                    token, menuitemid
                })
            }
            console.error("Error adding new favorite.", e);
        } catch (e) {
            // TODO: Add alert modal for errors
        }

        // TODO: Successful, fetch the updated menu after
    }

    render() {
        return (
            <View style={{
                ...styles.container.spaceBelow,
                ...styles.container.flexRow,
                justifyContent: 'space-between',
            }}>
                <TouchableOpacity
                    style={{ width: '80%' }}
                    onPress={() => {
                        this.props.getMenuItemInformation(this.props.dishID);
                        this.props.navigation.navigate('MenuItemView');
                    }}
                >
                    <Text style={{ ...styles.font.type.primaryRegular, ...styles.font.size.medium }}>
                        {this.props.dishName}
                    </Text>
                </TouchableOpacity>
                <AntDesign
                    name={this.state.isFave ? 'heart' : 'hearto'}
                    size={25}
                    onPress={this.toggleFavorite}
                    color={'#ff6666'}
                />
            </View>
        );
    }
}

export default connectToRedux(withNavigation(Dish), [sp.nav, 'userInformation']);