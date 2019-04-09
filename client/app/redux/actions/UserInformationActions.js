import * as types from './types';

export function saveUserNotificationID(notificationID) {
    return {
        type: types.SAVE_USER_NOTIFICATION_ID,
        payload: {
            notificationID
        }
    }
}