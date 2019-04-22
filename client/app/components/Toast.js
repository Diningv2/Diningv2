import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import styles from '../config/styles';

export const Toast = (props) => {

    containerStyle = {
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
        position: 'absolute',
        width: '100%',
        top: 0
    }

    touchableStyle = {
        zIndex: 1,
        width: '100%',
        height: 200,
    }

    notificationStyle = {
        ...styles.container.dropShadowLarge,
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
            <TouchableWithoutFeedback style={touchableStyle} onPress={props.onPress}>   
                <View style={notificationStyle}>
                    <Text style={textStyles.title}>{props.title}</Text>
                    <Text style={textStyles.message}>{props.message}</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default Toast;