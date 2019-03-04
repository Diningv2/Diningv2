// Helper function to create the reducer without switch statements
import createReducer from '../lib/createReducer';

// All the action types (messages) you could possibly have
import * as types from '../actions/types';

/* The initial state of these values. 
 * You can declare anything you'd like here.
 * */
const initialApplicationState = {
    loading: true
}

/* This is our reducer for application state values.
 * It updates the initial state above based on
 * the action messages it receives (along with the previous state)
 * and then you can modify it accordingly 
 * */
export const applicationState = createReducer(initialApplicationState, {
    [types.APP_START_LOADING](state, action) {
        return {
            ...state,
            loading: true
        }
    },
    [types.APP_FINISH_LOADING](state, action) {
        return {
            ...state,
            loading: false
        }
    },
})