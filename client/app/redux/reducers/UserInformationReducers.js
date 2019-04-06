import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

const initialUserInformationState = {
    notificationID: undefined
}

export const userInformation = createReducer(initialUserInformationState, {
    [types.SAVE_USER_NOTIFICATION_ID](state, action) {
        return {
            ...state,
            notificationID: action.payload.notificationID
        }
    }
})