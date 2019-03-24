import * as types from './types';
import { get } from '../../lib/api-utility';

export function getMenuItemInformation(itemID) {

    const request = () => {
        return { type: types.GET_MENU_ITEM_INFORMATION_REQUEST }
    }

    const success = (menuItem) => {
        return {
            type: types.GET_MENU_ITEM_INFORMATION_SUCCESS,
            payload: {
                menuItem: menuItem
            }
        }
    }

    const failure = (errorMessage) => {
        return {
            type: types.GET_MENU_ITEM_INFORMATION_FAILURE,
            errorMessage: errorMessage
        }
    }

    return async (dispatch) => {
        dispatch(request());
        try {
            const menuItem = await get("/api/menuItems", { menuitemid: itemID });
            dispatch(success(menuItem));
        } catch (e) {
            dispatch(failure(e.message));
        }
    }
}