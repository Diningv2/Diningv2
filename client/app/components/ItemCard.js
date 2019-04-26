import React from 'react';
import { View, Text } from 'react-native';
import styles, { colors, card } from '../config/styles';

/**
 * Card component to display title text, subtitle text,
 * and caption text.
 * (Primarily used for the favorite dishes component right now)
 */
export const ItemCard = (props) => {

    const containerStyle = {
        margin: 10
    }

    const titleStyle = {
        ...styles.font.type.primaryBold,
        ...styles.font.size.medium
    }

    const subTitleStyle = {
        ...styles.font.type.secondaryRegular,
        ...styles.font.size.small,
    }

    const captionStyle = {
        ...styles.font.type.primaryRegular,
        ...styles.font.size.small,
        opacity: 0.7
    }


    return (
        <View style={card}>
            <View style={containerStyle}>
                <Text style={titleStyle}>{props.title}</Text>
                <Text style={subTitleStyle}>{props.subTitle}</Text>
                <Text style={captionStyle}>{props.caption}</Text>
            </View>
        </View>
    )
}

export default ItemCard;