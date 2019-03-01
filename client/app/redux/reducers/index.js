
// Dining*v2 Reducers
import * as IncrementingReducers from './IncrementingReducers';
import * as ApplicationStateReducers from './ApplicationStateReducers';

// Any new reducers you make...import them above and add them to this list of exports
export default Object.assign({},
    IncrementingReducers,
    ApplicationStateReducers
)