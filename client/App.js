// Expo-related functions, will help us import fonts
import { Font, Notifications } from 'expo';
import React from 'react';
import { Animated, Easing, View } from 'react-native';
import { createNavigationReducer, createReactNavigationReduxMiddleware, createReduxContainer } from 'react-navigation-redux-helpers';
import transitionConfig from './app/config/transitions';

// Basic Redux imports
import { connect, Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { Toast } from './app/components/Toast';
import { MasterView } from './app/config/routes';

// Push Notifications Utility
import registerForPushNotificationsAsync from './app/lib/push-utility';

// Our Redux reducers
import reducers from './app/redux/reducers';

// Specific Redux actions we need to call on app startup
import { saveUserNotificationID } from './app/redux/actions/UserInformationActions';
import { getFavorites } from './app/redux/actions/FavoritesActions';
import BottomTabs from './app/components/BottomTabs';

// Configuring logger for the state of our app
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

// Configuring our navigation middleware
const Router = MasterView;
// const Router = createStackNavigator(Routes, { transitionConfig, headerMode: 'none', navigationOptions: { header: { visible: false } } });
const navigationMiddleware = createReactNavigationReduxMiddleware(
  state => state.nav
);

const nav = createNavigationReducer(Router);
const ReduxRouter = createReduxContainer(Router, "root");
const mapStateToProps = (state) => ({
  state: state.nav,
});
const ReduxRouterWithNavState = connect(mapStateToProps)(ReduxRouter);

// Configure our reducers
const allReducers = combineReducers({
  ...reducers,
  nav
});

// Configuring our app's store (state of our app!)
// (taken from the medium article)
function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
      navigationMiddleware
    )
  )
  return createStore(allReducers, initialState, enhancer)
}

const store = configureStore({});

export default class App extends React.Component {

  state = {
    appHasLoaded: false,
    notification: undefined
  }

  async handleLoadingFonts() {
      // Load the necessary fonts
      await Font.loadAsync({
        'Comfortaa Regular': require('./assets/fonts/Comfortaa/Comfortaa-Regular.ttf'),
      })
      await Font.loadAsync({
        'Comfortaa Bold': require('./assets/fonts/Comfortaa/Comfortaa-Bold.ttf'),
      })
      await Font.loadAsync({
        'SF Pro Text Bold': require('./assets/fonts/SFProText/SF-Pro-Text-Bold.ttf'),
      })
  }

  async handleRegisteringNotificationID() {
    const expoToken = await registerForPushNotificationsAsync();
    
    // Tell Redux to store our notification ID
    // (also acts as our device identifier for now)
    store.dispatch(saveUserNotificationID(expoToken));

    // Push notifications listener <- the observer!
    this.listener = Notifications.addListener(this.handleNotification);
  }

  async componentDidMount() {

    // Loading necessary resources
    // Retrieving data on startup
    await this.handleLoadingFonts();
    await this.handleRegisteringNotificationID();

    // App is ready to be loaded.
    this.setState({ appHasLoaded: true });
  }

  // Callback to run when we observe a new
  // push notification
  handleNotification = (notification) => {
    this.setState({ notification });
  };

  // Renders the notification component
  // with the proper notification data
  // If no notification data is passed in, render nothing.
  NotificationContainer = () => {
    if (!this.state.notification.data) return null;
    const { title, message } = this.state.notification.data;
    const dismiss = () => this.setState({notification: undefined});

    return (
      <Toast title={title || "Dining*v2"} message={message || "New alert!"} onPress={dismiss} />
    )
  }

  render() {
    const { NotificationContainer } = this;
    return (
      <Provider store={store}>
        {this.state.appHasLoaded &&
          <View style={{ flex: 1 }}>
            <ReduxRouterWithNavState />
            {this.state.notification && <NotificationContainer />}
          </View>
        }
      </Provider>
    );
  }
}