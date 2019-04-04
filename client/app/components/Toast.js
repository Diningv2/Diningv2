import React from 'react';
import { View, Text } from 'react-native';
import styles, { colors } from '../config/styles';

export const Toast = (props) => {

    containerStyle = {
        position: 'absolute',
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
        height: 200,
        width: '100%'
    }

    notificationStyle = {
        ...styles.container.dropShadow,
        paddingVertical: 20,
        paddingHorizontal: 20,
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        borderRadius: 20
    }

    textStyles = {
        title: {
            ...styles.font.color.primary,
            ...styles.font.type.primaryRegular,
            ...styles.font.size.large
        },
        message: {
            ...styles.font.color.tertiary,
            ...styles.font.type.primaryRegular,
        }
    }



    return (
        <View style={containerStyle}>
            <View style={notificationStyle}>
                <Text style={textStyles.title}>Hello.</Text>
                <Text style={textStyles.message}>I am toast!</Text>
            </View>
        </View>
    )
}