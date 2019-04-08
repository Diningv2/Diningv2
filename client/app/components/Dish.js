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
        const { data } = this.props.favoritesList;
        const isFave = data ? data[this.props.dishID] : false;
        this.setState({ isFave });
    }

    handlePress = async () => {
        // TODO: change the favorited status of the dish
        const token = this.props.userInformation.notificationID;
        const menuItemID = this.props.dishID;
        const postConfig = {
            token, menuItemID
        }

        // If the heart is full, do remove favorite
        // If the heart is empty, do add favorite
        try {
            if (this.state.isFave) {
                // await post('/api/favorites/delete', postConfig);
                this.props.removeFavorite(menuItemID);
                this.setState({isFave: false});
            } else {
                // await post('/api/favorites', postConfig);
                this.props.addFavorite(menuItemID);
                this.setState({isFave: true});
            }
        
        } catch(e) {
            console.error("Favorite add/remove error", e);
        }
    }

    render() {
        return (
            <View style={{
                ...styles.container.spaceBelow, 
                ...styles.container.flexRow,
                justifyContent: 'space-between',
            }}>
                <TouchableOpacity
                    style={{width: '80%'}}
                    onPress={() => {
                        this.props.getMenuItemInformation(this.props.dishID);
                        this.props.navigation.navigate('MenuItemView');
                    }}
                >
                    <Text style={{...styles.font.type.primaryRegular, ...styles.font.size.medium}}>
                        {this.props.dishName}
                    </Text>
                </TouchableOpacity>
                <AntDesign 
                    name={this.state.isFave ? 'heart' : 'hearto'} 
                    size={25} 
                    onPress={this.handlePress}
                    color={'#ff6666'}
                />
            </View> 
        );
    }
}

export default connectToRedux(withNavigation(Dish), [sp.userInformation, sp.favoritesList]);