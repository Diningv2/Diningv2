import HomeView from '../views/HomeView';
import DiningHallsView from '../views/DiningHallsView';

import TabBarView from '../views/TabBarView';
import TemplateView from '../views/TemplateView';

const TabBarRoutes = {
    FriendsView: TemplateView,
    DiningHallsView: DiningHallsView,
    FavoritesView: TemplateView
}

const Routes = {
    HomeView: { screen: HomeView },
    TabBarView: { screen: TabBarView(TabBarRoutes) }
};

export default Routes;