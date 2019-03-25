import * as types from './types';
import { get } from '../../lib/api-utility';

export function getMenus(locationID) {

    // -------- The Request Action --------
    // Usually called to let the Redux reducer
    // containing our state data that we should
    // flip an isLoading variable to "true"
    // while we wait to do the async API call
    const request = () => {
        return { type: types.GET_MENU_INFORMATION_REQUEST }
    }

    // -------- The Success Action --------
    // Called if the API call happened successfully 
    // Passes in what we got from the API call to the Redux store in payload.
    // Also sets "isLoading" back to false.
    const success = (menus) => {
        return {
            type: types.GET_MENU_INFORMATION_SUCCESS,
            payload: {
                menus: menus
            }
        }
    }

    // -------- The Failure Action --------
    // Called in the catch() block so Redux knows error occurred + what to do.
    // Maybe set some stuff back to 'undefined' and "isLoading" back to false
    const failure = (errorMessage) => {
        return {
            type: types.GET_MENU_INFORMATION_FAILURE,
            errorMessage: errorMessage
        }
    }

    // -------- The actual THUNK! --------
    // dispatch() is the function that executes
    // one of the above Redux actions.
    return async (dispatch) => {
        dispatch(request()); // tell Redux we're about to make that request
        try {
            const menus = await get("/api/menus", { location: locationID });
            dispatch(success(menus)); // If successfull, dispatch it to Redux
        } catch (e) {
            dispatch(failure(e.message));
        }
    }
}