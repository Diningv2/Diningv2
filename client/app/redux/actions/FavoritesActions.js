import * as types from './types';
import { get } from '../../lib/api-utility';

export function getFavorites(expoToken) {
    const request = () => {
        return { type: types.GET_FAVORITES_REQUEST }
    }

    const success = (favorites) => {
        return {
            type: types.GET_FAVORITES_SUCCESS,
            payload: {
                favorites: favorites
            }
        }
    }

    const failure = (errorMessage) => {
        return {
            type: types.GET_FAVORITES_FAILURE,
            errorMessage: errorMessage
        }
    }

    return async (dispatch) => {
        dispatch(request()); // tell Redux we're about to make that request
        try {
            console.log("ATTEMPTING TO GET FAVORITES NOW");
            const favorites = await get("/api/favorites", { 
                token: expoToken
             });
             console.log("FAVORITES OBJECT RETURNED IS", JSON.stringify(favorites));
            dispatch(success(favorites)); // If successful, dispatch it to Redux
        } catch (e) {
            dispatch(failure(e.message));
        }
    }
}

export function addFavorite(menuItemID) {
    return {
        type: types.ADD_FAVORITE,
        payload: {
            menuItemID
        }
    }
}

export function removeFavorite(menuItemID) {
    return {
        type: types.REMOVE_FAVORITE,
        payload: {
            menuItemID
        }
    }
}