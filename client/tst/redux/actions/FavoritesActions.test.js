import { fetchMock } from 'fetch-mock';
import { mockStore } from '../utils/mockStore';
import { getAction } from '../utils/getAction';

import { BASE_API_URL, EXPO_TOKEN_CHRIS } from '../../config/constants';
import { chrisFavoritesResponse} from '../../config/responseObjects/chrisFavoritesResponse';

import * as types from '../../../app/redux/actions/types';
import * as actions from '../../../app/redux/actions/FavoritesActions';

describe("REDUX THUNK ACTION: getFavorites", () => {
    const endpoint = `${BASE_API_URL}/api/favorites?token=${EXPO_TOKEN_CHRIS}`;

    it("tries to fetch a user's favorites and succeeds", async () => {
        const store = mockStore();
        
        // Mock our API call to return a successful response
        fetchMock.get(endpoint, chrisFavoritesResponse);

        // Run the thunk
        store.dispatch(actions.getFavorites(EXPO_TOKEN_CHRIS));

        // Prepare actual action return values from the thunk we just ran
        const actualRequestAction = await getAction(store, types.GET_FAVORITES_REQUEST);
        const actualSuccessAction = await getAction(store, types.GET_FAVORITES_SUCCESS);

        // Prepare expected action return values from the thunk we just ran
        const expectedRequestAction = { type: types.GET_FAVORITES_REQUEST };
        const expectedSuccessAction = { type: types.GET_FAVORITES_SUCCESS, payload: { favorites: chrisFavoritesResponse }};

        // Check for correct conditions
        expect(actualRequestAction).toEqual(expectedRequestAction);
        expect(actualSuccessAction).toEqual(expectedSuccessAction);

        fetchMock.restore();
    });

    it("tries to fetch a user's favorites but fails", async () => {
        const store = mockStore();

        // Mock our API call to return a failed response
        fetchMock.get(endpoint, { throws: new Error("Internal Server Error") })
        

        // Run the thunk
        store.dispatch(actions.getFavorites(EXPO_TOKEN_CHRIS));

        // Prepare actual action return values from the thunk we just ran
        const actualRequestAction = await getAction(store, types.GET_FAVORITES_REQUEST);
        const actualFailureAction = await getAction(store, types.GET_FAVORITES_FAILURE);

        // Prepare expected action return values from the thunk we just ran
        const expectedRequestAction = { type: types.GET_FAVORITES_REQUEST };
        const expectedFailureAction = { type: types.GET_FAVORITES_FAILURE, errorMessage: "Internal Server Error" };

        // Check for correct conditions
        await expect(actualRequestAction).toEqual(expectedRequestAction);
        await expect(actualFailureAction).toEqual(expectedFailureAction);
    });
});