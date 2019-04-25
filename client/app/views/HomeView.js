import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { colors } from "../config/styles";
import connectToRedux from "../redux/lib/connectToRedux";
import sp from "../redux/lib/stateProperties";

// The initial load/setup view for when Dining*v2 starts up
class HomeView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const expoToken = this.props.userInformation.notificationID;
    this.props.getFavorites(expoToken);
    this.props.getFilters(expoToken);

    if (this.props.diningHallsList && this.props.diningHallsList.isLoading) {
      this.props.getAllDiningHallsInformation();
    }
  }

  componentDidUpdate() {
    if (this.props.diningHallsList && !this.props.diningHallsList.isLoading) {
      this.props.navigation.navigate("DiningHallsView");
    }
  }

  render() {
    // Splash screen - logo with button to navigate to DiningHallsView
    return (
      <View style={splashScreenStyles.container}>
        <View>
          <LoadingIndicator color={colors.secondary} />
        </View>
        <View
          style={{ position: "absolute", backgroundColor: colors.primary }}
        />
      </View>
    );
  }
}

const splashScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#4a86e8"
  }
});

export default connectToRedux(HomeView, [
  sp.userInformation,
  sp.diningHallsList
]);
