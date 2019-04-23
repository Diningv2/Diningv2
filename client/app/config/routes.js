import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { colors } from './styles';
import transitionConfig from './transitions';
import NewBottomTabs from '../components/NewBottomTabs';

import HomeView from '../views/HomeView';
import DiningHallsView from '../views/DiningHallsView';
import MenuView from '../views/MenuView';
import MenuItemView from '../views/MenuItemView';
import FavoritesView from '../views/Favorites/MainView';
import AllergensView from '../views/AllergensView';

// Create our routes
const AllergensRoutes = {
    AllergensView: { screen: AllergensView }
}

const FavoritesRoutes = {
    FavoritesView: { screen: FavoritesView },
    MenuItemView: { screen: MenuItemView },
}

const DiningHallRoutes = {
    DiningHallsView: { screen: DiningHallsView },
    MenuView: { screen: MenuView },
    MenuItemView: { screen: MenuItemView }
}

const generalConfig = {
    headerMode: 'none', 
    navigationOptions: 
    { 
        header: {
             visible: false 
        } 
    },
    transitionConfig 
}

const tabBarConfig = {
    tabBarComponent: NewBottomTabs,
    tabBarOptions: {
        activeTintColor: colors.secondary,
        inactiveTintColor: 'rgba(255, 255, 255, 0.3)',
        style: {
            backgroundColor: colors.primary
        }
    }
}

// Create our stack navigators
const AllergensStack = createStackNavigator(AllergensRoutes, generalConfig);
const FavoritesStack = createStackNavigator(FavoritesRoutes, generalConfig);
const DiningHallsStack = createStackNavigator(DiningHallRoutes, generalConfig);

// Bundle all our stack navigators into the tabs view
const TabsView = createBottomTabNavigator({
    Allergens: AllergensStack, 
    DiningHalls: DiningHallsStack,
    Favorites: FavoritesStack, 
}, tabBarConfig);

const MasterRoutes = {
    HomeView: { screen: HomeView },
    TabsView: { screen: TabsView }
}

// Encapsulate our splash screen and the tabs view into one master view
export const MasterView = createStackNavigator(MasterRoutes, generalConfig);

