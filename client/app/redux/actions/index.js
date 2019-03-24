import * as IncrementingActions from './IncrementingActions';
import * as ApplicationStateActions from './ApplicationStateActions';
import * as DiningHallsInformationActions from './DiningHallInformationActions';
import * as MenuActions from './MenuActions';

export const allActions = Object.assign({},
    IncrementingActions,         // TODO: Delete these, just for getting started with Redux
    ApplicationStateActions,      // TODO: Delete these, just for getting started with Redux
    DiningHallsInformationActions,
    MenuActions,
);