import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from '../config/styles';

/**
 * A two-column text field used for Nutrition Info
 * TODO: Possible name change to <TwoColumnTextField />
 * since it could be used for other things besides
 * just nutrition info
 */
export default class NutritionInfoField extends Component {
    render() {
        return (
            <View style={{ ...styles.container.flexRow, ...styles.container.spaceBelow }}>
                <View style={{ width: '50%' }}>
                    <Text style={{ ...styles.font.type.primaryBold, ...styles.font.size.small }}>
                        {this.props.field}
                    </Text>
                </View>
                <View style={{ width: '50%' }}>
                    <Text style={{ ...styles.font.type.primaryRegular, ...styles.font.size.small }}>
                        {this.props.value}
                    </Text>
                </View>
            </View>
        )
    }
}