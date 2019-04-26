import * as actions from '../../../app/redux/actions/UserInformationActions';
import * as types from '../../../app/redux/actions/types';
import { EXPO_TOKEN_CHRIS } from '../../config/constants';

describe('actions', () => {
  it('should create an action to save the user expo token to Redux', () => {
    const expoToken = EXPO_TOKEN_CHRIS;
    const actualAction = actions.saveUserNotificationID(expoToken);
    const expectedAction = {
      type: types.SAVE_USER_NOTIFICATION_ID,
      payload: { notificationID: expoToken }
    }
    expect(actualAction).toEqual(expectedAction);
  })
})