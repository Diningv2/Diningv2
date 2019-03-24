import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from '../config/styles';

export default class Ingredient extends Component {
    render() {
        return (
            <View style={{ ...styles.container.spaceBelow }}>
                <Text style={{ ...styles.font.type.primaryBold, ...styles.font.size.medium }}>
                    {this.props.title}
                </Text>
            </View>
        )
    }
}