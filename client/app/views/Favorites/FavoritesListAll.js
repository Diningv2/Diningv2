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

const FavoritesListAll = (props) => {

    const renderFavesList = (dishID) => {
        // Because the backend response schema for getFavorites is different than the
        // redux store response when you favorite something immediately in the app.
        const dishName = props.favoritesList.data[dishID].name || props.favoritesList.data[dishID]

        return (
            <AnimatedListItem key={dishID}>
                <View style={{...styles.container.spaceBelowSmall}}>
                    <FavoriteItemCard dishID={dishID} name={dishName} />
                </View>
            </AnimatedListItem>
        );
    }

    return (
            <View>
                <Hint message="These are all the dishes you've favorited. Hold down on one to remove it." />
                <DV2ScrollView 
                    array={Object.keys(props.favoritesList.data)}
                    render={(dishID) => renderFavesList(dishID)}
                />
            </View>
    )
}

export default connectToRedux(FavoritesListAll, [sp.favoritesList]);