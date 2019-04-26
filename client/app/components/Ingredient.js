import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from '../config/styles';

/** Custom text component/list item primarily used
 * for displaying ingredients.
 * TODO: Nothing about this component instrinsically
 * speaks "ingredient", since it can hold any text,
 * so maybe we can suggest a name change?
 */
export default class Ingredient extends Component {
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