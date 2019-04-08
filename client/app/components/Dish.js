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
            token, 
            menuitemid: menuItemID
        }
        const previousState = this.state.isFave;

        // If the heart is full, do remove favorite
        // If the heart is empty, do add favorite
        try {
            if (this.state.isFave) {
                this.setState({isFave: false});
                await post('/api/favorites/delete', postConfig);
                this.props.removeFavorite(menuItemID);
            } else {
                this.setState({isFave: true});
                await post('/api/favorites', postConfig);
                this.props.addFavorite(menuItemID);
            }
        
        } catch(e) {
            console.error("Favorite add/remove error", e.message);
            this.setState({isFave: previousState});
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
                <TouchableOpacity onPress={this.handlePress}>
                <AntDesign 
                    name={this.state.isFave ? 'heart' : 'hearto'} 
                    size={25} 
                    color={'#ff6666'}
                />
                </TouchableOpacity>
            </View> 
        );
    }
}

export default connectToRedux(withNavigation(Dish), [sp.userInformation, sp.favoritesList]);