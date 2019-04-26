import { fetchMock } from 'fetch-mock';
import { mockStore } from '../utils/mockStore';
import { getAction } from '../utils/getAction';

import { BASE_API_URL, BEEF_BRISKET_ID } from '../../config/constants';
import { beefBrisketMenuItemResponse } from '../../config/responseObjects/beefBrisketMenuItemResponse';

import * as types from '../../../app/redux/actions/types';
import * as actions from '../../../app/redux/actions/MenuItemInformationActions';

describe("REDUX THUNK ACTION: getMenuItemInformation", () => {
    const endpoint = `${BASE_API_URL}/api/menuItems?menuitemid=${BEEF_BRISKET_ID}`;

    it("tries to fetch item information on Beef Brisket and succeeds", async () => {
        const store = mockStore();
        
        // Mock our API call to return a successful response
        fetchMock.get(endpoint, beefBrisketMenuItemResponse);

        // Run the thunk
        store.dispatch(actions.getMenuItemInformation(beefBrisketMenuItemResponse));

        // Prepare actual action return values from the thunk we just ran
        const actualRequestAction = await getAction(store, types.GET_MENU_ITEM_INFORMATION_REQUEST);
        const actualSuccessAction = await getAction(store, types.GET_MENU_ITEM_INFORMATION_SUCCESS);

        // Prepare expected action return values from the thunk we just ran
        const expectedRequestAction = { type: types.GET_MENU_ITEM_INFORMATION_REQUEST };
        const expectedSuccessAction = { type: types.GET_MENU_ITEM_INFORMATION_SUCCESS, payload: { menuItem: beefBrisketMenuItemResponse }};

        // Check for correct conditions
        expect(actualRequestAction).toEqual(expectedRequestAction);
        expect(actualSuccessAction).toEqual(expectedSuccessAction);

        fetchMock.restore();
    });

    it("tries to fetch item information on Beef Brisket but fails", async () => {
        const store = mockStore();

        // Mock our API call to return a failed response
        fetchMock.get(endpoint, { throws: new Error("Internal Server Error") })
        

        // Run the thunk
        store.dispatch(actions.getMenuItemInformation({itemID: BEEF_BRISKET_ID, hasInfo: false}));

        // Prepare actual action return values from the thunk we just ran
        const actualRequestAction = await getAction(store, types.GET_MENU_ITEM_INFORMATION_REQUEST);
        const actualFailureAction = await getAction(store, types.GET_MENU_ITEM_INFORMATION_FAILURE);

        // Prepare expected action return values from the thunk we just ran
        const expectedRequestAction = { type: types.GET_MENU_ITEM_INFORMATION_REQUEST };
        const expectedFailureAction = { type: types.GET_MENU_ITEM_INFORMATION_FAILURE, errorMessage: "Internal Server Error" };

        // Check for correct conditions
        await expect(actualRequestAction).toEqual(expectedRequestAction);
        await expect(actualFailureAction).toEqual(expectedFailureAction);
    });
});