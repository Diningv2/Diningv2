// React/React Native imports
import React, { Component } from 'react';
import { ScrollView, ActivityIndicator, Text, View, TouchableOpacity } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

// Redux imports
import connectToRedux from '../redux/lib/connectToRedux';
import sp from '../redux/lib/stateProperties';

// Custom component imports
import Header from '../components/Header';
import ListItem from '../components/ListItem';

// Style library import
import styles from '../config/styles';
import getMenuItems from '../apiCalls/getMenuItems';


class MenuItemsView extends Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  async componentDidMount(){
    try {
      var ret = await getMenuItems(5908402);
    } catch(e){
      console.log(e);
    }
    this.setState({
        isLoading: false,
        ret: ret,
        name: ret.name,
        servingSize: ret.nutrition.servingSize,
        calories: ret.nutrition.calories,
      }, function(){});
    return ret;
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, paddingTop:100}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:100}}>
        <ScrollView>
          <Text>{JSON.stringify(this.state.name)}</Text>
          <Text>{JSON.stringify(this.state.servingSize)}</Text>
          <Text>{JSON.stringify(this.state.calories)}</Text>
          <Text>{JSON.stringify(this.state.ret)}</Text>
        </ScrollView>
        
      </View>
    );
  }
}

export default connectToRedux(MenuItemsView, [sp.incrementingValues]);