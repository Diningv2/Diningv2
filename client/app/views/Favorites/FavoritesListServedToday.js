import React from 'react';
import { View } from 'react-native';
import { AnimatedListItem } from '../../components/Animatable';
import CenterTextView from '../../components/CenterTextView';
import { DV2ScrollView } from '../../components/DV2ScrollView';
import FavoriteServedTodayCard from '../../components/FavoriteServedTodayCard';
import Hint from '../../components/Hint';
import styles from '../../config/styles';
import connectToRedux from '../../redux/lib/connectToRedux';
import sp from '../../redux/lib/stateProperties';

class FavoritesListServedToday extends React.Component {

    constructor(props) {
        super(props);
    }

    prompts = {
        favoritesNotYetVisible: (
            "It looks like you have some favorites, but you won't see them " 
            + "until our servers figure out where they're being served!"
        ),
        hint: (
            "Your favorites being served today! Keep in mind, if you favorite "
            + "something in the middle of the day, you might need to restart "
            + "the app before it shows up here!"
        ),
    }

    favoritesServedTodayArray = [];

    componentDidMount() {
        // Get favorites when this view mounts
        const { data } = this.props.favoritesList;
        this.favoritesServedTodayArray = 
            Object.keys(data).filter(dishID => data[dishID].isBeingServed);
    }

    renderFavesList = (dishID) => {
        const dish = props.favoritesList.data[dishID];
        return (
            <AnimatedListItem key={dishID}>
                <View style={{...styles.container.spaceBelowSmall}}>
                    <FavoriteServedTodayCard favoriteDish={dish} />
                </View>
            </AnimatedListItem>
        );
    }


    render() {
        if (this.favoritesServedTodayArray.length == 0) { // No faves 
            return (
                <CenterTextView message={this.prompts.favoritesNotYetVisible} />
            );
        }
        return (
            <View style={{marginHorizontal: 10, flex: 1}}>
                <Hint message={prompts.hint} />
                <View style={{ flex: 1}}>
                    <DV2ScrollView 
                        array={favoritesServedTodayArray}
                        render={(dishID) => renderFavesList(dishID)}
                    />
                </View>
            </View>
        );
    }
}

export default connectToRedux(FavoritesListServedToday, [sp.favoritesList, sp.userInformation]);