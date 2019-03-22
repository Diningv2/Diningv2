import React from 'react';

// Basic Redux imports
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

// Redux Navigation imports
import { FluidNavigator } from 'react-navigation-fluid-transitions';

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

// Configuring logger for the state of our app
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

// Configuring our navigation middleware
const Router = FluidNavigator(Routes);
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
    appHasLoaded: false
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

    // App is ready to be loaded.
    this.setState({appHasLoaded: true});

  }
  
  render() {
    return (
      <Provider store={store}>
        {this.state.appHasLoaded && 
          <ReduxRouterWithNavState />
        }
      </Provider>
    );
  }
}