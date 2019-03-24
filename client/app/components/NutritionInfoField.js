import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from '../config/styles';

export default class NutritionInfoField extends Component {
    render() {
        return (
            <View style={{ ...styles.container.flexRow, ...styles.container.spaceBelow }}>
                <View style={{ width: '50%' }}>
                    <Text style={{ ...styles.font.type.primaryBold, ...styles.font.size.medium }}>
                        {this.props.field}
                    </Text>
                </View>
                <View style={{ width: '50%' }}>
                    <Text style={{ ...styles.font.type.primaryRegular, ...styles.font.size.medium }}>
                        {this.props.value}
                    </Text>
                </View>
            </View>
        )
    }
}