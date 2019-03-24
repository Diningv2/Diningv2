import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import connectToRedux from '../redux/lib/connectToRedux';
import sp from '../redux/lib/stateProperties';

class MenuItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity 
                key={this.props.itemID}
                onPress={() => {
                    // TODO: Set redux state that we're viewing this item (or itemID?) ?
                    // TODO: this.props.getMenuItemInfo(this.props.ItemID) 
                    // TODO: this.props.navigation.navigate('MenuItemView')
                }} 
            >
                <ListItem title={this.props.itemName} />
            </TouchableOpacity>
        );
    }

}

// TODO: export default connectToRedux(??)