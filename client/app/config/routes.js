import HomeView from '../views/HomeView';
import DiningHallsView from '../views/DiningHallsView';

import TemplateView from '../views/TemplateView';
import TopTabsTemplateView from '../views/TopTabsTemplateView';
import MenuView from '../views/MenuView';
import MenuItemView from '../views/MenuItemView';
import FavoritesView from '../views/FavoritesView';
import AllergensView from '../views/AllergensView';

const Routes = {
    HomeView: { screen: HomeView },
    AllergensView: { screen: TopTabsTemplateView },
    DiningHallsView: { screen: DiningHallsView },
    FavoritesView: { screen: FavoritesView },
    MenuView: { screen: MenuView },
    MenuItemView: { screen: MenuItemView },
    AllergensView: {screen: AllergensView },
};

export default Routes;