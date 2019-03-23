import * as types from './types';
import { get } from '../../lib/api-utility';

/** OUR FIRST REDUX THUNK ACTION to get the object
 * that contains all the dining halls' information
 * from the Diningv2 Locations API
 * 
 * Notice how the "thunk" contains 3 possible
 * actions to be dispatched to Redux based on
 * whether or not we get the data back successfully
 * 
 * P.S. remember all the data manipulation still is
 * gonna happen in the corresponding reducer for this
 * so you'll have to check DiningHallInformationReducers
 * to get the full story.
 */
export function getAllDiningHallsInformation() {

    // -------- The Request Action --------
    // Usually called to let the Redux reducer
    // containing our state data that we should
    // flip an isLoading variable to "true"
    // while we wait to do the async API call
    const request = () => {
        return { type: types.GET_ALL_DINING_HALLS_INFORMATION_REQUEST }
    }

    // -------- The Success Action --------
    // Usually called if the API call happened
    // successfully and we can pass in what we got
    // from the API call to the Redux store
    // in the payload.
    // OH, also to set "isLoading" back to false.
    const success = (diningHalls) => {
        return { 
            type: types.GET_ALL_DINING_HALLS_INFORMATION_SUCCESS,
            payload: {
                diningHalls: diningHalls
            }
        }
    }

    // -------- The Failure Action --------
    // Called in the catch() block, so Redux knows that
    // an error occurred and what to do.
    // Maybe set some stuff back to 'undefined'
    // and of course, set "isLoading" back to false?
    const failure = (errorMessage) => {
        return { 
            type: types.GET_ALL_DINING_HALLS_INFORMATION_FAILURE,
            errorMessage: errorMessage
         }
    }

    // -------- The actual THUNK! --------
    // dispatch() is the function that executes
    // one of the above Redux actions.
    return async (dispatch) => {
        dispatch(request()); // tell Redux we're about to make that request
        try {
            const diningHalls = await get("/api/locations"); // fetch data!
            dispatch(success(diningHalls)); // If successfull, dispatch it to Redux
        } catch (e) {
            dispatch(failure(e.message)); // If failed, dispatch whatever the error message was instead :(
        }
    }
}