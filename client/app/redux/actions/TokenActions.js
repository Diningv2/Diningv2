import * as types from './types';
import { get } from '../../lib/api-utility';

export function setToken(token) {

    

    // -------- The set Action --------
    // sets token in redux
    const set = (token) => {
        
        return {
            type: types.SET_TOKEN_SUCCESS,
            payload: {
                token: token
            }
        }
    }

    const failure = (message) => {
        return {
            type: types.SET_TOKEN_FAILURE   ,
            errorMessage: message
        }
    }

    return async (dispatch) => {
        try {
            dispatch(set(token)); // If successfull, dispatch it to Redux
        } catch (e) {
            dispatch(failure(e.message)); // If failed, dispatch whatever the error message was instead :(
        }
    }
   
}