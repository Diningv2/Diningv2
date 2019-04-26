import { fetchMock } from 'fetch-mock';
import { mockStore } from '../utils/mockStore';
import { getAction } from '../utils/getAction';

import { BASE_API_URL, EXPO_TOKEN_CHRIS } from '../../config/constants';
import { filtersResponse } from '../../config/responseObjects/filtersResponse';

import * as types from '../../../app/redux/actions/types';
import * as actions from '../../../app/redux/actions/FilterActions';

describe("REDUX THUNK ACTION: getFilters", () => {
    const endpoint = `${BASE_API_URL}/api/preferences?token=${EXPO_TOKEN_CHRIS}`;

    it("tries to fetch a user's filter (allergen) preferences and succeeds", async () => {
        const store = mockStore();
        
        // Mock our API call to return a successful response
        fetchMock.get(endpoint, filtersResponse);

        // Run the thunk
        store.dispatch(actions.getFilters(EXPO_TOKEN_CHRIS));

        // Prepare actual action return values from the thunk we just ran
        const actualRequestAction = await getAction(store, types.GET_FILTERS_REQUEST);
        const actualSuccessAction = await getAction(store, types.GET_FILTERS_SUCCESS);

        // Prepare expected action return values from the thunk we just ran
        const expectedRequestAction = { type: types.GET_FILTERS_REQUEST };
        const expectedSuccessAction = { type: types.GET_FILTERS_SUCCESS, payload: { filters: filtersResponse }};

        // Check for correct conditions
        expect(actualRequestAction).toEqual(expectedRequestAction);
        expect(actualSuccessAction).toEqual(expectedSuccessAction);

        fetchMock.restore();
    });

    it("tries to fetch a user's filter (allergen) preferences but fails", async () => {
        const store = mockStore();

        // Mock our API call to return a failed response
        fetchMock.get(endpoint, { throws: new Error("Internal Server Error") })
        

        // Run the thunk
        store.dispatch(actions.getFilters(EXPO_TOKEN_CHRIS));

        // Prepare actual action return values from the thunk we just ran
        const actualRequestAction = await getAction(store, types.GET_FILTERS_REQUEST);
        const actualFailureAction = await getAction(store, types.GET_FILTERS_FAILURE);

        // Prepare expected action return values from the thunk we just ran
        const expectedRequestAction = { type: types.GET_FILTERS_REQUEST };
        const expectedFailureAction = { type: types.GET_FILTERS_FAILURE, errorMessage: "Internal Server Error" };

        // Check for correct conditions
        await expect(actualRequestAction).toEqual(expectedRequestAction);
        await expect(actualFailureAction).toEqual(expectedFailureAction);
    });
});