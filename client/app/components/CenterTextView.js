import React from 'react';
import { View, Text } from 'react-native';
import styles from '../config/styles';

const CenterTextView = (props) => {
    const containerStyle = {
        ...styles.container.center,
        ...styles.container.withPadding
    }
    const textStyle = {
        ...styles.font.type.primaryRegular, 
        ...styles.font.color.primary,
        ...styles.font.size.medium, 
        textAlign: 'center'
    }
    return (
        <View style={containerStyle}>
            <Text style={textStyle}>
                {props.message}
            </Text>
        </View>
    )
}

export default CenterTextView;