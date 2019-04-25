import { fetchMock } from 'fetch-mock';
import { mockStore } from '../utils/mockStore';
import { getAction } from '../utils/getAction';

import { BASE_API_URL } from '../../config/constants';
import { locationsResponse } from '../../config/responseObjects/locationsResponse';

import * as types from '../../../app/redux/actions/types';
import * as actions from '../../../app/redux/actions/DiningHallInformationActions';

describe("REDUX THUNK ACTION: getAllDiningHallsInformation", () => {
    const endpoint = `${BASE_API_URL}/api/locations`;

    it("tries to fetches all dining halls from our backend API and succeeds", async () => {
        const store = mockStore();
        
        // Mock our API call to return a successful response
        fetchMock.get(endpoint, locationsResponse);

        // Run the thunk
        store.dispatch(actions.getAllDiningHallsInformation());

        // Prepare actual action return values from the thunk we just ran
        const actualRequestAction = await getAction(store, types.GET_ALL_DINING_HALLS_INFORMATION_REQUEST);
        const actualSuccessAction = await getAction(store, types.GET_ALL_DINING_HALLS_INFORMATION_SUCCESS);

        // Prepare expected action return values from the thunk we just ran
        const expectedRequestAction = { type: types.GET_ALL_DINING_HALLS_INFORMATION_REQUEST };
        const expectedSuccessAction = { type: types.GET_ALL_DINING_HALLS_INFORMATION_SUCCESS, payload: {diningHalls: locationsResponse }};

        // Check for correct conditions
        expect(actualRequestAction).toEqual(expectedRequestAction);
        expect(actualSuccessAction).toEqual(expectedSuccessAction);

        fetchMock.restore();
    });

    it("tries to fetches all dining halls from our backend API but fails", async () => {
        const store = mockStore();

        // Mock our API call to return a failed response
        fetchMock.get(endpoint, { throws: new Error("Internal Server Error") })
        

        // Run the thunk
        store.dispatch(actions.getAllDiningHallsInformation());

        // Prepare actual action return values from the thunk we just ran
        const actualRequestAction = await getAction(store, types.GET_ALL_DINING_HALLS_INFORMATION_REQUEST);
        const actualFailureAction = await getAction(store, types.GET_ALL_DINING_HALLS_INFORMATION_FAILURE);

        // Prepare expected action return values from the thunk we just ran
        const expectedRequestAction = { type: types.GET_ALL_DINING_HALLS_INFORMATION_REQUEST };
        const expectedFailureAction = { type: types.GET_ALL_DINING_HALLS_INFORMATION_FAILURE, errorMessage: "Internal Server Error" };

        // Check for correct conditions
        await expect(actualRequestAction).toEqual(expectedRequestAction);
        await expect(actualFailureAction).toEqual(expectedFailureAction);
    });
});