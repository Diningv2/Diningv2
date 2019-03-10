/** Taken from medium article (will get link in a second)
 * Gets rid of the need for switch statement overhead when writing reducers
 *  It should just make our lives easier */
export default function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    }
}