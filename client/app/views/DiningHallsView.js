import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import { AnimatedListItem } from "../components/Animatable";
import DiningHallItem from "../components/DiningHallItem";
import { DV2ScrollView } from "../components/DV2ScrollView";
import Header from "../components/Header";
import { LoadingIndicator } from "../components/LoadingIndicator";
import dHallIDs from "../config/dHallIDs";
import connectToRedux from "../redux/lib/connectToRedux";

// Renders a full list of all the dining halls
class DiningHallsView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // if not yet loaded, call redux action to get dhalls from our backend API
    if (this.props.diningHallsList.isLoading) {
      this.props.getAllDiningHallsInformation();
    }
  }

  renderDiningHall = (diningHall, index) => {
    // render method needed by dv2scrollview
    // DiningHallItem includes the name and busyness meter
    return (
      <AnimatedListItem key={index} index={index}>
        <TouchableOpacity
          key={diningHall.name}
          onPress={() => {
            this.props.getMenus(dHallIDs[diningHall.name]); // Set redux state with menu for this dHall
            this.props.navigation.navigate("MenuView");
          }}
        >
          <DiningHallItem
            name={diningHall.name}
            isOpen={diningHall.isOpen}
            busyness={diningHall.busyness}
          />
        </TouchableOpacity>
      </AnimatedListItem>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title="Dining Halls" />
        <View style={{ flex: 1 }}>
          {this.props.diningHallsList.isLoading ? (
            <LoadingIndicator />
          ) : (
            // Loading complete, show list of DiningHallItems
            <View style={{ paddingTop: 10 }}>
              <DV2ScrollView
                array={this.props.diningHallsList.data}
                render={(element, index) =>
                  this.renderDiningHall(element, index)
                }
              />
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default connectToRedux(DiningHallsView, ["diningHallsList"]);
