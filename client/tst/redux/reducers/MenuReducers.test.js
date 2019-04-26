import { menusList } from '../../../app/redux/reducers/MenuReducers'
import * as types from '../../../app/redux/actions/types'
import { allActions } from '../../../app/redux/actions';
import { menusResponse } from '../../config/responseObjects/menusResponse';


const initialState = {
    isLoading: true,
    errorMessage: undefined,
    hasError: false,
    data: undefined,
}




describe ('MenuReducers', () => {

    it('should handle GET_MENU_INFORMATION_REQUEST', () => {
        const requestAction = {
            type: types.GET_MENU_INFORMATION_REQUEST
        };
        expect(menusList(initialState, requestAction)).toEqual({
            ...initialState, 
            hasError: false, 
            isLoading: true
        });
    });

    it('should handle GET_MENU_INFORMATION_FAILURE', () => {
        const failureAction = {
            type: types.GET_MENU_INFORMATION_FAILURE,
            errorMessage: 'errorMessage'
        };
        expect(menusList(initialState, failureAction)).toEqual({
            ...initialState,
            data: undefined,
            isLoading: false, 
            hasError: true,
            errorMessage: failureAction.errorMessage
        });
    });

    it('should handle GET_MENU_INFORMATION_SUCCESS', () => {
        const successAction = {
            type: types.GET_MENU_INFORMATION_SUCCESS,
            payload: {
                menus: menusResponse
            }
        };
        const menusObject = Object.values(successAction.payload.menus);
        let menusArray = Object.values(menusObject);

        expect(menusList(initialState, successAction)).toEqual({
            ...initialState,
            data: menusArray[0],
            hasError: false,
            isLoading: false
        });
    });
});