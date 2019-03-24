import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

const initialState = {
    isLoading: true,
    errorMessage: "",
    data: undefined
}

export const menuItem = createReducer(initialState, {
    [types.GET_MENU_ITEM_INFORMATION_REQUEST](state, action) {
        return {
            ...state,
            isLoading: true
        }
    },
    [types.GET_MENU_ITEM_INFORMATION_SUCCESS](state, action) {
        return {
            ...state,
            data: action.payload.menuItem,
            isLoading: false
        }
    },
    [types.GET_MENU_ITEM_INFORMATION_FAILURE](state, action) {
        return {
            ...state,
            data: undefined,
            isLoading: false,
            errorMessage: action.errorMessage
        }
    }
})