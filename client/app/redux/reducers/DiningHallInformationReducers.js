// Helper function to create the reducer without switch statements
import createReducer from '../lib/createReducer';

// All the action types (messages) you could possibly have
import * as types from '../actions/types';

/* The initial state of these values. 
 * You can declare anything you'd like here.
 * */
const initialState = {
    isLoading: true,
    errorMessage: "",
    data: undefined
}

/* This is our reducer for incrementing values.
 * It updates the initial state above based on
 * the action messages it receives (along with the previous state)
 * and then you can modify it accordingly 
 * */
export const diningHallsList = createReducer(initialState, {
    [types.GET_ALL_DINING_HALLS_INFORMATION_REQUEST](state, action) {
        return {
            ...state,
            isLoading: true // we've initiating the request, set loading to true!
        }
    },
    [types.GET_ALL_DINING_HALLS_INFORMATION_SUCCESS](state, action) {
        const diningHallsObject = action.payload.diningHalls;
        const diningHallsArray = Object.values(diningHallsObject);

        return {
            ...state,
            data: diningHallsArray,
            isLoading: false // set isLoading to false so our UI knows it can show the data!
        }
    },
    [types.GET_ALL_DINING_HALLS_INFORMATION_FAILURE](state, action) {
        return {
            ...state,
            data: undefined,
            isLoading: false, // set isLoading to false so our UI knows we're not still loading :(
            errorMessage: action.errorMessage // we can also add this to display what went wrong too
        }
    }
})