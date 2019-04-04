import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import connectToRedux from '../redux/lib/connectToRedux';
import sp from '../redux/lib/stateProperties';

import AntDesign from '@expo/vector-icons/AntDesign';
import styles from '../config/styles';

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
            this.setState({isFave: true});
        };
    }

    handlePress = () => {
        // TODO: change the favorited status of the dish

        this.setState(state => {
            return {
                isFave: !state.isFave,
            }
        })
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

export default connectToRedux(withNavigation(Dish), [sp.nav]);