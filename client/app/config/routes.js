import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { colors } from './styles';
import transitionConfig from './transitions';
import BottomTabs from '../components/BottomTabs';

import HomeView from '../views/HomeView';
import DiningHallsView from '../views/DiningHallsView';
import MenuView from '../views/MenuView';
import MenuItemView from '../views/MenuItemView';
import FavoritesView from '../views/Favorites/MainView';
import AllergensView from '../views/AllergensView';

/** 
 * The following routes are configuration variables
 * for the StackNavigators, which contain the view
 * components
 */
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

/**
 * This is general configuration information
 * for StackNavigators.
 * Removes the default header (we use our own custom Header component)
 * Introduces our own transition configuraiton animations
 */
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

/**
 * Configuration for the TabNavigator
 * Defines our own custom component for
 * bottom tabs
 */
const tabBarConfig = {
    tabBarComponent: BottomTabs,
    tabBarOptions: {
        activeTintColor: colors.secondary,
        inactiveTintColor: 'rgba(255, 255, 255, 0.3)',
        style: {
            backgroundColor: colors.primary
        }
    }
}

/** 
 * Create our stack navigators with
 * the designated routes and configurations
 * */
const AllergensStack = createStackNavigator(AllergensRoutes, generalConfig);
const FavoritesStack = createStackNavigator(FavoritesRoutes, generalConfig);
const DiningHallsStack = createStackNavigator(DiningHallRoutes, generalConfig);

/** 
 * Bundles our stack navigators into
 * a single tab navigator with the
 * specified configuration
*/
const TabsView = createBottomTabNavigator({
    Allergens: AllergensStack, 
    DiningHalls: DiningHallsStack,
    Favorites: FavoritesStack, 
}, tabBarConfig);

/**
 * Our master routes for the master/top-level
 * stack navigator that contains the splash/home
 * view and the tabs view!
 */
const MasterRoutes = {
    HomeView: { screen: HomeView },
    TabsView: { screen: TabsView }
}

// Encapsulate our splash screen and the tabs view into one master view
export const MasterView = createStackNavigator(MasterRoutes, generalConfig);

