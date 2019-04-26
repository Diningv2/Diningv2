import React from 'react';
import { View, Text } from 'react-native';
import styles from '../config/styles';

/**
 * Stylized text component useful for displaying
 * small helper/tooltip/hint messages on screen
 */
const Hint = (props) => {
    const textStyle = {
        textAlign: 'center',
        ...styles.font.type.primaryRegular,
        ...styles.font.color.primary
    }
    return (
        <View style={{marginVertical: 10}}>
            <Text style={textStyle}>
                {props.message}
            </Text>
        </View>
    )
}

export default Hint;