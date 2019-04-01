// Helper function to create the reducer without switch statements
import createReducer from '../lib/createReducer';

// All the action types (messages) you could possibly have
import * as types from '../actions/types';

/* The initial state of these values. 
 * You can declare anything you'd like here.
 * */
const initialState = {
    Alcohol: false, 
    Nuts: false, 
    Shellfish: false, 
    Peanut: false, 
    Dairy: false, 
    Eggs: false, 
    Vegan: false, 
    Pork: false, 
    FishSeafood: false, 
    Soy: false, 
    Wheat: false, 
    Gluten: false, 
    Vegetarian: false, 
    GlutenFree: false,
}

/* 
 * It updates the initial state above based on
 * the action messages it receives (along with the previous state)
 * and then you can modify it accordingly 
 * */
export const allergensList = createReducer(initialState, {
    
    [types.TOGGLE_ALLERGEN_SUCCESS](state, action) {
        const allergen = action.payload.allergen;
        const value = action.payload.value;
        
        return {
            ...state,
            [allergen]: value,
        }
    },

    [types.TOGGLE_ALLERGEN_FAILURE](state, action) {  
         
        return {
            ...state,
            errorMessage: action.errorMessage
        }
    }
    
    
})