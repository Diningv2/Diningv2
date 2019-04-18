import React from 'react';
import { View, Text } from 'react-native';
import styles, { colors } from '../config/styles';

export const ItemCard = () => {

    const cardStyle = {
        backgroundColor: colors.secondary,
        borderRadius: 10,
        width: '100%',
        ...styles.container.dropShadow,
        shadowRadius: 3,
        elevation: 3
    }

    const containerStyle = {
        margin: 10
    }

    const titleStyle = {
        ...styles.font.type.primaryBold,
        ...styles.font.size.medium
    }

    const subTitleStyle = {
        ...styles.font.type.secondaryRegular,
        ...styles.font.size.smallMedium
    }

    const captionStyle = {
        ...styles.font.type.primaryRegular,
        ...styles.font.size.smallMedium,
        opacity: 0.7
    }


    return (
        <View style={cardStyle}>
            <View style={containerStyle}>
            <Text style={titleStyle}>Yale's Creamy Macaroni and Cheese</Text>
            <Text style={subTitleStyle}>Dinner</Text>
            <Text style={captionStyle}>Served at Berkeley, Davenport, Morse, etc.</Text>
            </View>
        </View>
    )
}

export default ItemCard;