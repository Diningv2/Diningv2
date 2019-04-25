import * as DiningHallsInformationActions from './DiningHallInformationActions';
import * as MenuItemInformationActions from './MenuItemInformationActions';
import * as MenuActions from './MenuActions';
import * as FavoritesActions from './FavoritesActions';
import * as UserInformationActions from './UserInformationActions';
import * as FilterActions from './FilterActions';

export const allActions = Object.assign({},
    DiningHallsInformationActions,
    MenuItemInformationActions,
    MenuActions,
    FavoritesActions,
    UserInformationActions,
    FilterActions
);