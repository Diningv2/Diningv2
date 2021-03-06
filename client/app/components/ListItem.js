import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from '../config/styles';

export default class ListItem extends Component {
    render() { 
        return (
            <View style={{ ...styles.container.spaceBelow}}>
                <Text style={{ ...styles.font.type.primaryRegular, ...styles.font.size.medium }}>
                    {this.props.title}
                </Text>
                <Text style={{ ...styles.font.type.secondaryRegular, opacity: 0.6 }}>
                    {this.props.subtitle}
                </Text>
            </View>
        )
    }
}