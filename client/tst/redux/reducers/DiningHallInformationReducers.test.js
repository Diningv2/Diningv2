import { diningHallsList } from '../../../app/redux/reducers/DiningHallInformationReducers'
import * as types from '../../../app/redux/actions/types'
import { allActions } from '../../../app/redux/actions';
import stateProperties from '../../../app/redux/lib/stateProperties';
import { locationsResponse } from '../../config/responseObjects/locationsResponse';


const initialState = {
    isLoading: true,
    hasError: false,
    errorMessage: undefined,
    data: undefined,
    dataObject: undefined
}


describe ('DiningHallsInformationReducers', () => {

    it('should handle GET_ALL_DINING_HALLS_INFORMATION_REQUEST', () => {
        const requestAction = {
            type: types.GET_ALL_DINING_HALLS_INFORMATION_REQUEST
        };
        expect(diningHallsList(initialState, requestAction)).toEqual({
            ...initialState, 
            hasError: false, 
            isLoading: true
        });
    });

    it('should handle GET_ALL_DINING_HALLS_INFORMATION_FAILURE', () => {
        const failureAction = {
            type: types.GET_ALL_DINING_HALLS_INFORMATION_FAILURE,
            errorMessage: 'errorMessage'
        };
        expect(diningHallsList(initialState, failureAction)).toEqual({
            ...initialState,
            data: undefined,
            dataObject: undefined,
            isLoading: false, 
            hasError: true,
            errorMessage: failureAction.errorMessage
        });
    });

    it('should handle GET_ALL_DINING_HALLS_INFORMATION_SUCCESS', () => {
        const successAction = {
            type: types.GET_ALL_DINING_HALLS_INFORMATION_SUCCESS,
            payload: {
                diningHalls: locationsResponse
            }
        };
        expect(diningHallsList(initialState, successAction)).toEqual({
            ...initialState,
            data: Object.values(successAction.payload.diningHalls),
            dataObject: successAction.payload.diningHalls,
            hasError: false,
            isLoading: false
        });
    });

});