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

// Renders JSX with content for "Served Today" favorites tab
class FavoritesListServedToday extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        servedTodayArray: [] // this array should be reflected in state to trigger re-render
    }

    prompts = {
        favoritesNotYetVisible: (
            "It looks like you have some favorites, but you won't see them " 
            + "until our servers figure out where they're being served!"
        ),
        hint: (
            "(Keep in mind, if you favorite something in the middle of the "
            + "day, you might need to restart the app before it shows up here!)"
        ),
    }

    // On mount, set state with list of favorites being served today
    componentDidMount() {
        const { data } = this.props.favoritesList;
        const servedTodayArray = Object.keys(data)
            .filter(dishID => data[dishID].isBeingServed);
        this.setState({ servedTodayArray });
    }

    // Returns card for a dish in the ScrollView as identified by dishID
    renderFavesList = (dishID) => {
        const dish = this.props.favoritesList.data[dishID];
        return (
            <View key={dishID}>
                {dish &&
                    <AnimatedListItem>
                        <View style={{ ...styles.container.spaceBelowSmall }}>
                            <FavoriteServedTodayCard favoriteDish={dish} />
                        </View>
                    </AnimatedListItem>

                }
            </View>
        );
    }

    render() {
        if (this.state.servedTodayArray.length == 0) {
            return (
                <CenterTextView message={this.prompts.favoritesNotYetVisible} />
            );
        }
        return (
            <View style={{marginHorizontal: 10, flex: 1}}>
                <Hint message={this.prompts.hint} />
                <View style={{ flex: 1}}>
                    <DV2ScrollView 
                        array={this.state.servedTodayArray}
                        render={(dishID) => this.renderFavesList(dishID)}
                    />
                </View>
            </View>
        );
    }
}

export default connectToRedux(FavoritesListServedToday, [sp.favoritesList, sp.userInformation]);