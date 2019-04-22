import React from 'react';
import ItemCard from './ItemCard';
import connectToRedux from '../redux/lib/connectToRedux';
import sp from '../redux/lib/stateProperties';
import { formatArrayAsString } from '../lib/string-utility';

class FavoriteServedTodayCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { favoriteDish } = this.props;
        const { name, meals, location } = favoriteDish;

        return (
            <ItemCard
                title={name}
                subTitle={formatArrayAsString(meals || [])}
                message={formatArrayAsString(location || [])}
            />
        )
    }
}

export default connectToRedux(FavoriteServedTodayCard, [sp.favoritesList]);