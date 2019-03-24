
// Dining*v2 Reducers
import * as IncrementingReducers from './IncrementingReducers';         // TODO: Remove later, after we get acquainted with Redux
import * as ApplicationStateReducers from './ApplicationStateReducers'; // TODO: Remove later, after we get acquainted with Redux
import * as DiningHallsInformationReducers from './DiningHallInformationReducers';
import * as MenuItemInformationReducers from './MenuItemInformationReducers';
import * as MenuReducers from './MenuReducers';

// Any new reducers you make...import them above and add them to this list of exports
export default Object.assign({},
    IncrementingReducers,    // TODO: Remove later, after we get acquainted with using Redux
    ApplicationStateReducers, // TODO: Remove later, after we get acquainted with using Redux
    DiningHallsInformationReducers,
    MenuItemInformationReducers,
    MenuReducers
)