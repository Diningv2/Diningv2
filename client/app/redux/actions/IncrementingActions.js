
// TODO: Delete this whole file later
// just used for testing out Redux
import * as types from './types';

export function increaseMe() {
    return {
        type: types.INCREASE_ME
    }
}

export function decreaseMe() {
    return {
        type: types.DECREASE_ME
    }
}