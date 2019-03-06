
// TODO: Delete this whole file later
// just used for testing out Redux
import * as types from './types';

export function startLoading(message) {
    return {
        type: types.APP_START_LOADING,
        payload: {
            message: message || "Loading..."
        }
    }
}

export function finishLoading() {
    return {
        type: types.APP_FINISH_LOADING
    }
}