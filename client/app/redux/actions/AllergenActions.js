import * as types from './types';
import { get } from '../../lib/api-utility';

export function toggleAllergens(value, allergen) {

    

    // -------- The Toggle Action --------
    // Called if the API call happened successfully 
    // Passes in what we got from the API call to the Redux store in payload.
    // Also sets "isLoading" back to false.
    const toggle = (allergen, value) => {
        
        return {
            type: types.TOGGLE_ALLERGEN_SUCCESS,
            payload: {
                allergen: allergen,
                value: value
            }
        }
    }

    const failure = (message) => {
        return {
            type: types.TOGGLE_ALLERGEN_FAILURE,
            errorMessage: message
        }
    }

    return async (dispatch) => {
        try {
            dispatch(toggle(allergen, value)); // If successfull, dispatch it to Redux
        } catch (e) {
            dispatch(failure(e.message)); // If failed, dispatch whatever the error message was instead :(
        }
    }
   
}