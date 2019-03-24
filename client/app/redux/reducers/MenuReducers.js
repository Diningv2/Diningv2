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

/* 
 * It updates the initial state above based on
 * the action messages it receives (along with the previous state)
 * and then you can modify it accordingly 
 * */
export const menusList = createReducer(initialState, {
    [types.GET_MENU_INFORMATION_REQUEST](state, action) {
        return {
            ...state,
            isLoading: true // we've initiated the request, set loading to true
        }
    },
    [types.GET_MENU_INFORMATION_SUCCESS](state, action) {
        const menusObject = action.payload.menus;

        return {
            ...state,
            data: menusObject[0],
            isLoading: false // set isLoading to false so UI shows the data
        }
    },
    [types.GET_MENU_INFORMATION_FAILURE](state, action) {
        return {
            ...state,
            data: undefined,
            isLoading: false, // set isLoading to false - not still loading :(
            errorMessage: action.errorMessage // can add to display error msg
        }
    }
})