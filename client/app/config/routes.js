import HomeView from '../views/HomeView';
import DiningHallsView from '../views/DiningHallsView';

import TemplateView from '../views/TemplateView';
import TopTabsTemplateView from '../views/TopTabsTemplateView';

const Routes = {
    HomeView: { screen: HomeView },
    FriendsView: { screen: TopTabsTemplateView },
    DiningHallsView: { screen: DiningHallsView },
    FavoritesView: { screen: TemplateView },
};

export default Routes;