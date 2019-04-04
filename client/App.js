import React from 'react';

// Basic Redux imports
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

// Redux Navigation imports
import { FluidNavigator } from 'react-navigation-fluid-transitions';
import { createStackNavigator } from 'react-navigation';
import { Animated, Easing, View, TouchableOpacity } from 'react-native';



import Routes from './app/config/routes'
import {
  createReduxContainer,
  createNavigationReducer,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

// Our Redux reducers
import reducers from './app/redux/reducers';

// Expo-related functions, will help us import fonts
import { Font } from 'expo';

// Push Notifications Utility
import registerForPushNotificationsAsync from './app/lib/push-utility';
import { Notifications } from 'expo';
import { Toast } from './app/components/Toast';

// Configuring logger for the state of our app
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

// Configuring our navigation middleware
const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps

      const thisSceneIndex = scene.index
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      })

      return { transform: [{ translateX }] }
    },
  }
}

const Router = createStackNavigator(Routes, { transitionConfig, headerMode: 'none', navigationOptions: { header: { visible: false } } });
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

  async componentDidMount() {

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

    await registerForPushNotificationsAsync();

    // Push notifications listener <- the observer!
    this.listener = Notifications.addListener(this.handleNotification);

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
      <Toast title={title || "Dining*v2"} message={message || "New alert."} onPress={dismiss} />
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