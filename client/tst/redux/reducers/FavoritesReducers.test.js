import { favoritesList } from '../../../app/redux/reducers/FavoritesReducers'
import * as types from '../../../app/redux/actions/types'
import { allActions } from '../../../app/redux/actions';
import { favoritesResponse } from '../../config/responseObjects/favoritesResponse';


const initialState = {
    isLoading: true,
    errorMessage: "",
    data: undefined,
}

const loadedState = {
    isLoading: true,
    errorMessage: "",
    data: favoritesResponse,
}

function copyObject(src) {
    return Object.assign({}, src);
  }


describe ('FavoritesReducers', () => {

    it('should handle GET_FAVORITES_REQUEST', () => {
        const requestAction = {
            type: types.GET_FAVORITES_REQUEST
        };
        expect(favoritesList(initialState, requestAction)).toEqual({
            ...initialState, 
            hasError: false, 
            isLoading: true
        });
    });

    it('should handle GET_FAVORITES_FAILURE', () => {
        const failureAction = {
            type: types.GET_FAVORITES_FAILURE,
            errorMessage: 'errorMessage'
        };
        expect(favoritesList(initialState, failureAction)).toEqual({
            ...initialState,
            data: undefined,
            isLoading: false, 
            hasError: true,
            errorMessage: failureAction.errorMessage
        });
    });

    it('should handle GET_FAVORITES_SUCCESS', () => {
        const successAction = {
            type: types.GET_FAVORITES_SUCCESS,
            payload: {
                favorites: favoritesResponse
            }
        };
        expect(favoritesList(initialState, successAction)).toEqual({
            ...initialState,
            data: successAction.payload.favorites,
            hasError: false,
            isLoading: false
        });
    });

    it('should handle ADD_FAVORITE', () => {
        const addAction = {
            type: types.ADD_FAVORITE,
            payload: {
                menuItemID: '1234',
                menutItemName: 'Yale Creamy Mac and Cheese'
            }
        };
        // Expect new data to be old data with soy set to true
        // Create the expected object here
        const updatedData = copyObject(loadedState.data);
        updatedData[addAction.payload.menuItemID] = addAction.payload.menuItemName

        expect(favoritesList(loadedState, addAction)).toEqual({
            ...loadedState,
            data: updatedData,
        });
    });

    it('should handle REMOVE_FAVORITE', () => {
        const removeAction = {
            type: types.REMOVE_FAVORITE,
            payload: {
                menuItemID: '5416409'
            }
        };
        // Expect new data to be old data with fishSeafood set to false
        // Create the expected object here
        const updatedData = copyObject(loadedState.data);
        delete updatedData[removeAction.payload.menuItemID];

        expect(favoritesList(loadedState, removeAction)).toEqual({
            ...loadedState,
            data: updatedData,
        });
    });

});