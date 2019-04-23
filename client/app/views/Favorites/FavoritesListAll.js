import React from 'react';
import { View } from 'react-native';
import { AnimatedListItem } from '../../components/Animatable';
import CenterTextView from '../../components/CenterTextView';
import { DV2ScrollView } from '../../components/DV2ScrollView';
import FavoriteItemCard from '../../components/FavoriteItemCard';
import styles from '../../config/styles';
import connectToRedux from '../../redux/lib/connectToRedux';
import sp from '../../redux/lib/stateProperties';
import Hint from '../../components/Hint';
import Dish from '../../components/Dish';

const FavoritesListAll = (props) => {

    const renderFavesList = (dishID) => {
        // Because the backend response schema for getFavorites is different than the
        // redux store response when you favorite something immediately in the app.
        const dishName = props.favoritesList.data[dishID].name || props.favoritesList.data[dishID]
            const dish = {
                name: dishName,
                itemID: dishID,
                hasInfo: false
            };
        return (
            <AnimatedListItem key={dishID}>
                <Dish dish={dish} />
            </AnimatedListItem>
        );
    }

    return (
            <View>
                <Hint message="These are all the dishes you've favorited." />
                <DV2ScrollView 
                    array={Object.keys(props.favoritesList.data)}
                    render={(dishID) => renderFavesList(dishID)}
                />
            </View>
    )
}

export default connectToRedux(FavoritesListAll, [sp.favoritesList]);