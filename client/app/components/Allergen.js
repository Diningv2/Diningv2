import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from '../config/styles';

/** Custom text component/list item primarily used
 * for displaying allergens
 * TODO: This seems to be a duplicate of the
 * Ingredients component- unless you have
 * plans to differentiate this component somehow?
 */
export default class Allergen extends Component {
    render() {
        return (
            <View style={{ ...styles.container.spaceBelow }}>
                <Text style={{ ...styles.font.type.primaryRegular, ...styles.font.size.small }}>
                    {this.props.title}
                </Text>
            </View>
        )
    }
}