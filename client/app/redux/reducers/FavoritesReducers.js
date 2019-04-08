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
    data: undefined,
}

/* 
 * It updates the initial state above based on
 * the action messages it receives (along with the previous state)
 * and then you can modify it accordingly 
 * */
export const favoritesList = createReducer(initialState, {
    [types.GET_FAVORITES_REQUEST](state, action) {
        return {
            ...state,
            hasError: false,
            isLoading: true // we've initiated the request, set loading to true
        }
    },
    [types.GET_FAVORITES_SUCCESS](state, action) {
        const favoritesObject = action.payload.favorites;
        return {
            ...state,
            data: favoritesObject,
            hasError: false,
            isLoading: false // set isLoading to false so UI shows the favoritesObject
        }
    },
    [types.GET_FAVORITES_FAILURE](state, action) {
        return {
            ...state,
            data: undefined,
            hasError: true,
            isLoading: false, // set isLoading to false - not still loading :(
            errorMessage: action.errorMessage // can add to display error msg
        }
    },

    [types.ADD_FAVORITE](state, action) {
        const favoritesObject = state.data || {};
        const { menuItemID, menuItemName } = action.payload;
        favoritesObject[menuItemID] = menuItemName;

        return {
            ...state,
            data: favoritesObject
        }
    },
    [types.REMOVE_FAVORITE](state, action) {
        const favoritesObject = state.data || {};
        const menuItemID = action.payload.menuItemID;
        
        delete favoritesObject[menuItemID];
        
        return {
            ...state,
            data: favoritesObject
        }
    }
})