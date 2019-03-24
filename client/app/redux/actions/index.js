import * as IncrementingActions from './IncrementingActions';
import * as ApplicationStateActions from './ApplicationStateActions';
import * as DiningHallsInformationActions from './DiningHallInformationActions';
import * as MenuItemInformationActions from './MenuItemInformationActions';

export const allActions = Object.assign({},
    IncrementingActions,         // TODO: Delete these, just for getting started with Redux
    ApplicationStateActions,      // TODO: Delete these, just for getting started with Redux
    DiningHallsInformationActions,
    MenuItemInformationActions
);