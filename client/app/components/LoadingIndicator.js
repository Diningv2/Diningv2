import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export const LoadingIndicator = (props) => {

    const containerStyle = {
        ...styles.container.center,
        ...styles.container.withPadding
    }

    return (
        <View style={containerStyle}>
            <ActivityIndicator style={{scaleX: 3, scaleY: 3}} />
        </View>
    )
}