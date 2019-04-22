import * as types from './types';
import { get } from '../../lib/api-utility';

export function getFilters(expoToken) {
    const request = () => {
        return { type: types.GET_FILTERS_REQUEST }
    }

    const success = (filters) => {
        return {
            type: types.GET_FILTERS_SUCCESS,
            payload: {
                filters: filters
            }
        }
    }

    const failure = (errorMessage) => {
        return {
            type: types.GET_FILTERS_FAILURE,
            errorMessage: errorMessage
        }
    }

    return async (dispatch) => {
        dispatch(request()); // tell Redux we're about to make that request
        try {
            const filters = await get("/api/filters", { 
                token: expoToken
             });
            dispatch(success(filters)); // If successful, dispatch it to Redux
        } catch (e) {
            dispatch(failure(e.message));
        }
    }
}

export function addFilter(menuItemID, menuItemName) {
    return {
        type: types.ADD_FILTER,
        payload: {
            menuItemID,
            menuItemName
        }
    }
}

export function removeFilter(menuItemID) {
    return {
        type: types.REMOVE_FILTER,
        payload: {
            menuItemID
        }
    }
}