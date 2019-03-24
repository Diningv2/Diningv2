import HomeView from '../views/HomeView';
import DiningHallsView from '../views/DiningHallsView';

import TemplateView from '../views/TemplateView';

const Routes = {
    HomeView: { screen: HomeView },
    FriendsView: { screen: TemplateView },
    DiningHallsView: { screen: DiningHallsView },
    FavoritesView: { screen: TemplateView },
    MenuItemView: { screen: MenuItemView }
};

export default Routes;