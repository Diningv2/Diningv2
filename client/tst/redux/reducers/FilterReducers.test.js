import { filtersList } from '../../../app/redux/reducers/FilterReducers'
import * as types from '../../../app/redux/actions/types'
import { allActions } from '../../../app/redux/actions';
import { filtersResponse } from '../../config/responseObjects/filtersResponse';


const initialState = {
    isLoading: true,
    errorMessage: "",
    data: undefined,
}

const loadedState = {
    isLoading: true,
    errorMessage: "",
    data: filtersResponse,
}

function bestCopyEver(src) {
    return Object.assign({}, src);
  }


describe ('FilterReducers', () => {

    it('should handle GET_FILTERS_REQUEST', () => {
        const requestAction = {
            type: types.GET_FILTERS_REQUEST
        };
        expect(filtersList(initialState, requestAction)).toEqual({
            ...initialState, 
            hasError: false, 
            isLoading: true
        });
    });

    it('should handle GET_FILTERS_FAILURE', () => {
        const failureAction = {
            type: types.GET_FILTERS_FAILURE,
            errorMessage: 'errorMessage'
        };
        expect(filtersList(initialState, failureAction)).toEqual({
            ...initialState,
            data: undefined,
            isLoading: false, 
            hasError: true,
            errorMessage: failureAction.errorMessage
        });
    });

    it('should handle GET_FILTERS_SUCCESS', () => {
        const successAction = {
            type: types.GET_FILTERS_SUCCESS,
            payload: {
                filters: filtersResponse
            }
        };
        expect(filtersList(initialState, successAction)).toEqual({
            ...initialState,
            data: successAction.payload.filters,
            hasError: false,
            isLoading: false
        });
    });

    it('should handle ADD_FILTER', () => {
        const addAction = {
            type: types.ADD_FILTER,
            payload: {
                allergen: 'soy'
            }
        };
        // Expect new data to be old data with soy set to true
        // Create the expected object here
        const updatedData = bestCopyEver(loadedState.data);
        updatedData[addAction.payload.allergen] = true;

        expect(filtersList(loadedState, addAction)).toEqual({
            ...loadedState,
            data: updatedData,
        });
    });

    it('should handle REMOVE_FILTER', () => {
        const removeAction = {
            type: types.REMOVE_FILTER,
            payload: {
                allergen: 'fishSeafood'
            }
        };
        // Expect new data to be old data with fishSeafood set to false
        // Create the expected object here
        const updatedData = bestCopyEver(loadedState.data);
        updatedData[removeAction.payload.allergen] = false;

        expect(filtersList(loadedState, removeAction)).toEqual({
            ...loadedState,
            data: updatedData,
        });
    });

});