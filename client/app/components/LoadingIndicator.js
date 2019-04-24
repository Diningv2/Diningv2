import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { colors } from '../config/styles';

export const LoadingIndicator = (props) => {

    const containerStyle = {
        ...styles.container.center,
        ...styles.container.withPadding
    }

    const color = props.color || colors.primary;

    return (
        <View style={containerStyle}>
            <ActivityIndicator size="large" color={color} />
        </View>
    )
}