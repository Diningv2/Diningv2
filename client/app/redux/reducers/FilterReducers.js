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
export const filtersList = createReducer(initialState, {
    [types.GET_FILTERS_REQUEST](state, action) {
        return {
            ...state,
            hasError: false,
            isLoading: true // we've initiated the request, set loading to true
        }
    },
    [types.GET_FILTERS_SUCCESS](state, action) {
        const filtersObject = action.payload.filters;
        return {
            ...state,
            data: filtersObject,
            hasError: false,
            isLoading: false // set isLoading to false so UI shows the filtersObject
        }
    },
    [types.GET_FILTERS_FAILURE](state, action) {
        return {
            ...state,
            data: undefined,
            hasError: true,
            isLoading: false, // set isLoading to false - not still loading :(
            errorMessage: action.errorMessage // can add to display error msg
        }
    },

    [types.ADD_FILTER](state, action) {
        const filtersObject = state.data || {};
        const { allergen } = action.payload;
        filtersObject[allergen] = true;

        return {
            ...state,
            data: filtersObject
        }
    },
    [types.REMOVE_FILTER](state, action) {
        const filtersObject = state.data || {};
        const {allergen} = action.payload;
        filtersObject[allergen] = false;
        
        return {
            ...state,
            data: filtersObject
        }
    }
})