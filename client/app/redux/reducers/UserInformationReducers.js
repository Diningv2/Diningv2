import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

const initialUserInformationState = {
    notificationID: undefined
}

export const userInformation = createReducer(initialUserInformationState, {
    [types.SAVE_USER_NOTIFICATION_ID](state, action) {
        const expoToken = action.payload.notificationID.split("[")[1].split("]")[0];
        return {
            ...state,
            notificationID: expoToken
        }
    }
})