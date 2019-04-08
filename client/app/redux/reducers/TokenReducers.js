// Helper function to create the reducer without switch statements
import createReducer from '../lib/createReducer';

// All the action types (messages) you could possibly have
import * as types from '../actions/types';

/* The initial state of these values. 
 * You can declare anything you'd like here.
 * */
const initialState = {
    token: undefined
}

/* 
 * It updates the initial state above based on
 * the action messages it receives (along with the previous state)
 * and then you can modify it accordingly 
 * */
export const expoToken = createReducer(initialState, {
    
    [types.SET_TOKEN_SUCCESS](state, action) {
        const token = action.payload.token;
        
        return {
            ...state,
            token: token,
        }
    },

    [types.TOGGLE_ALLERGEN_FAILURE](state, action) {  
         
        return {
            ...state,
            errorMessage: action.errorMessage
        }
    }
    
    
})