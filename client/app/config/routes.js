import HomeView from '../views/HomeView';
import TestView from '../views/TestView';
import TabBarView from '../views/TabBarView';
import TemplateView from '../views/TemplateView';

const TabBarRoutes = {
    FriendsView: TemplateView,
    DiningHallsView: TestView,
    FavoritesView: TemplateView
}

const Routes = {
    HomeView: { screen: HomeView },
    TestView: { screen: TestView },
    TabBarView: { screen: TabBarView(TabBarRoutes) }
};

export default Routes;