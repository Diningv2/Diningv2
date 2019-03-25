import React, { Component } from 'react';
import { Alert, View } from 'react-native';

import connectToRedux from '../redux/lib/connectToRedux';

import Header from '../components/Header';
import BottomTabs from '../components/BottomTabs';
import TopTabs from '../components/TopTabs';

class TopTabsTemplateView extends Component {

  constructor(props) {
    super(props);
  }

  handleAlert(title, msg) {
    // Works on both iOS and Android
    Alert.alert(
      title,
      msg,
      [
        { text: 'OK', onPress: () => console.log(title + ' Pressed') }
      ],
      { cancelable: false },
    );
  }

  f1 = () => this.handleAlert('f1', 'Pressed f1');
  f2 = () => this.handleAlert('f2', 'Pressed f2');
  f3 = () => this.handleAlert('f3', 'Pressed f3');

  tabButtons = [
    {
      tabName: 'Tab1',
      function: this.f1
    },
    {
      tabName: 'Tab2',
      function: this.f2
    },
    {
      tabName: 'Tab3',
      function: this.f3
    }
  ]

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title="Template View" />
        <TopTabs tabButtons={this.tabButtons} />
        <BottomTabs viewName={'TemplateView'} />
      </View>
    )
  }
}

// Connects the exported component to Redux
// for access to the Redux store
export default connectToRedux(TopTabsTemplateView, []);