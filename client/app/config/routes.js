import HomeView from '../views/HomeView';
import DiningHallsView from '../views/DiningHallsView';

import TemplateView from '../views/TemplateView';
import NutritionInfoView from '../views/NutritionInfoView';
import IngredientsView from '../views/IngredientsView';
import AllergensView from '../views/AllergensView';

const Routes = {
    HomeView: { screen: HomeView },
    FriendsView: { screen: TemplateView },
    DiningHallsView: { screen: DiningHallsView },
    FavoritesView: { screen: TemplateView },
    NutritionInfoView: { screen: NutritionInfoView },
    IngredientsView: { screen: IngredientsView },
    AllergensView: { screen: AllergensView }
};

export default Routes;