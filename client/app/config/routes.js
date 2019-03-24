import HomeView from '../views/HomeView';
import DiningHallsView from '../views/DiningHallsView';

import TemplateView from '../views/TemplateView';
import NutritionInfoView from '../views/NutritionInfoView';
import IngredientsView from '../views/IngredientsView';
import AllergensView from '../views/AllergensView';
import TopTabsTemplateView from '../views/TopTabsTemplateView';
import MenuView from '../views/MenuView';

const Routes = {
    HomeView: { screen: HomeView },
    FriendsView: { screen: TopTabsTemplateView },
    DiningHallsView: { screen: DiningHallsView },
    FavoritesView: { screen: TemplateView },
    NutritionInfoView: { screen: NutritionInfoView },
    IngredientsView: { screen: IngredientsView },
    AllergensView: { screen: AllergensView },
    MenuView: { screen: MenuView },
};

export default Routes;