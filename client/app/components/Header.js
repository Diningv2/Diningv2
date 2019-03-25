import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

import connectToRedux from '../redux/lib/connectToRedux';
import sp from '../redux/lib/stateProperties';

import styles from '../config/styles';

class Header extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.navigation)
    }

    // Can go back is enabled if you set the canGoBack prop to true AND
    // you're actually able to go back in the navigation stack
    canGoBack = () => this.props.canGoBack
    goBack = () => this.props.navigation.goBack();

    render() {
        return (
            <View style={{...styles.container.backgroundColorPrimary, ...styles.container.dropShadow}}>
                <View style={{...styles.spacing.above.medium, padding: 20}}>
                    <View style={{...styles.container.flexRow}}>
                        {this.canGoBack() &&
                            <TouchableOpacity style={{paddingRight: 10}}
                                onPress={() => this.goBack()}>
                                <AntDesign name="arrowleft" size={32} color="white" />
                            </TouchableOpacity>
                        }
                        <View>
                            <Text style={{...styles.font.type.primaryBold, ...styles.font.size.medium, color: '#fff'}}>{this.props.title}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default connectToRedux(withNavigation(Header), [sp.nav]);