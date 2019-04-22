import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import ItemCard from './ItemCard';
import connectToRedux from '../redux/lib/connectToRedux';
import sp from '../redux/lib/stateProperties';
import { post } from '../lib/api-utility';

import { withNavigation } from 'react-navigation';

class FavoriteItemCard extends React.Component {

    constructor(props) {
        super(props);
    }

    removeFavorite = async () => {
        const token = this.props.userInformation.notificationID;
        const menuitemid = this.props.dishID;
        const name = this.props.name
        const postConfig = {
            token,
            menuitemid,
            name
        }
        try {
            await post('/api/favorites/delete', postConfig);
            this.props.removeFavorite(menuitemid);
        } catch (e) {
            console.error("Favorites remove error :(", e);
        }
    }

    render() {
        return (
            <TouchableOpacity
                onLongPress={this.removeFavorite}>
                <ItemCard
                    title={this.props.name}
                />
            </TouchableOpacity>
        )
    }
}

export default connectToRedux(withNavigation(FavoriteItemCard), [sp.userInformation]);