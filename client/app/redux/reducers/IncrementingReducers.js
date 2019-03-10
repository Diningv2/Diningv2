// Helper function to create the reducer without switch statements
import createReducer from '../lib/createReducer';

// All the action types (messages) you could possibly have
import * as types from '../actions/types';

/* The initial state of these values. 
 * You can declare anything you'd like here.
 * */
const initialIncrementingState = {
    stateValue1: 0,
    stateValue2: 10
}

/* This is our reducer for incrementing values.
 * It updates the initial state above based on
 * the action messages it receives (along with the previous state)
 * and then you can modify it accordingly 
 * */
export const incrementingValues = createReducer(initialIncrementingState, {
    [types.INCREASE_ME](state, action) {
        return {
            ...state,
            stateValue1: state.stateValue1 + 1,
            stateValue2: state.stateValue2 + 5
        }
    },
    [types.DECREASE_ME](state, action) {
        return {
            ...state,
            stateValue1: state.stateValue1 - 1,
            stateValue2: state.stateValue2 - 5
        }
    }
})