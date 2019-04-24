import * as IncrementingActions from './IncrementingActions';
import * as ApplicationStateActions from './ApplicationStateActions';
import * as DiningHallsInformationActions from './DiningHallInformationActions';
import * as MenuItemInformationActions from './MenuItemInformationActions';
import * as MenuActions from './MenuActions';
import * as FavoritesActions from './FavoritesActions';
import * as UserInformationActions from './UserInformationActions';
import * as FilterActions from './FilterActions';

export const allActions = Object.assign({},
    IncrementingActions,         // TODO: Delete these, just for getting started with Redux
    ApplicationStateActions,      // TODO: Delete these, just for getting started with Redux
    DiningHallsInformationActions,
    MenuItemInformationActions,
    MenuActions,
    FavoritesActions,
    UserInformationActions,
    FilterActions
);