import React, { Component } from "react";
import { Text, View } from "react-native";
import { AnimatedListItem } from "../components/Animatable";
import CenterTextView from "../components/CenterTextView";
import Dish from "../components/Dish";
import { DV2ScrollView } from "../components/DV2ScrollView";
import Header from "../components/Header";
import { LoadingIndicator } from "../components/LoadingIndicator";
import TopTabs from "../components/TopTabs";
import formattedMealTypes from "../config/formattedMealTypes";
import styles from "../config/styles";
import { search } from "../lib/search-utility";
import sp from "../redux/lib/stateProperties";
import connectToRedux from "../redux/lib/connectToRedux";

class MenuView extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    mealArray: undefined,
    mealArrayFiltered: undefined,
    searchTerm: "",
    hoursMessage: "",
    selectedDay: "Today",
    meal: ""
  };

  // We need to call performSearch with the new
  // search term when a top tab is pressed,
  // so we need to keep a local state of the search term
  updateSearchTerm = searchTerm => {
    this.setState({ searchTerm: searchTerm });
  };

  performSearch = searchTerm => {
    // If the search term is empty
    // just output everything
    if (searchTerm.trim() == "") {
      this.setState({
        mealArrayFiltered: this.state.mealArray
      });
      // Otherwise do an actual search on the array
    } else {
      const mealArrayFiltered = search(searchTerm, this.state.mealArray, [
        "name"
      ]);
      this.setState({ mealArrayFiltered });
    }
  };

  generateHoursMessage = mealType => {
    const name = this.props.menusList.data.location;
    const location = this.props.diningHallsList.dataObject[name];
    // json in redux has info for all meals, get hours for selected day and meal tabs
    const mealTimes =
      this.state.selectedDay == "Today"
        ? location.todayHours[mealType]
        : location.tomorrowHours[mealType];

    const openingTime = mealTimes.openingTime;
    const closingTime = mealTimes.closingTime;
    const transferTime = mealTimes.transferTime;

    return (
      `open from ${openingTime} to ${closingTime}` +
      ((transferTime && ` (transfers at ${transferTime})`) || "")
    );
  };

  // Functions for day tabs
  dayTabButtons = () => {
    const dayTypes = ["today", "tomorrow"];
    const formatted = {
      today: "Today",
      tomorrow: "Tomorrow"
    };

    const tabs = dayTypes.map(dayType => {
      return {
        tabName: formatted[dayType],
        function: () => {
          // Start loading indicator
          this.setState({ isLoading: true });

          // Run after 200ms to let tab change colors immediately
          setTimeout(() => {
            this.setState(
              {
                selectedDay: formatted[dayType],
                mealArray: this.props.menusList.data[dayType][this.state.meal],
                mealArrayFiltered: this.props.menusList.data[dayType][
                  this.state.meal
                ]
              },
              () => {
                // Stop loading after the new state is ready
                this.setState({ isLoading: false });
              }
            );
          }, 500);
        }
      };
    });
    return tabs;
  };

  // Dynamically sets the header text based on
  // the success and fail conditions of this page load
  setHeaderText = (successCondition, failCondition) => {
    if (successCondition) {
      const diningHallName = this.props.menusList.data.location;
      return diningHallName;
    }
    if (failCondition) return "Server Error";

    // Otherwise the text will stay as "Loading..."
    return "Loading...";
  };

  // Dynamically set the number, size, and title of tab buttons
  dynamicTabButtons = () => {
    const menu = this.props.menusList.data;
    const day = this.state.selectedDay == "Today" ? menu.today : menu.tomorrow;

    const mealTypes = Object.keys(formattedMealTypes).filter(
      mealType => day[mealType] && day[mealType].length
    );
    let tabButtons = mealTypes.map(mealType => {
      return {
        tabName: formattedMealTypes[mealType],
        function: () => {
          const mealArray =
            this.state.selectedDay == "Today"
              ? this.props.menusList.data.today[mealType]
              : this.props.menusList.data.tomorrow[mealType];
          const mealArrayFiltered = mealArray;
          const hoursMessage = this.generateHoursMessage(mealType);

          // Start loading indicator
          this.setState({ isLoading: true });

          // Run after 200ms to let tabs change color on press
          setTimeout(() => {
            this.setState(
              {
                mealArray,
                mealArrayFiltered,
                hoursMessage,
                meal: mealType
              },
              () => {
                this.performSearch(this.state.searchTerm);
                this.setState({ isLoading: false });
              }
            );
          }, 500);
        }
      };
    });

    return tabButtons;
  };

  render() {
    const { menusList } = this.props;
    const hasLoadedSuccessfully = !menusList.isLoading && !menusList.hasError;
    const hasLoadedFailed = !menusList.isLoading && menusList.hasError;

    return (
      <View style={{ flex: 1 }}>
        <Header
          canGoBack
          title={this.setHeaderText(hasLoadedSuccessfully, hasLoadedFailed)}
        />
        {hasLoadedSuccessfully && (
          <View style={{ flex: 1 }}>
            <AnimatedListItem key="toptabs" index={3}>
              <View style={{ ...styles.container.withPaddingTop }}>
                <TopTabs tabButtons={this.dayTabButtons()} />
              </View>
              <View
                style={{
                  paddingTop: 2,
                  ...styles.container.withPaddingBottom
                }}
              >
                <TopTabs tabButtons={this.dynamicTabButtons()} />
              </View>
            </AnimatedListItem>
            {!this.state.isLoading && (
              <AnimatedListItem key="hourstext" index={4}>
                <Text
                  style={{
                    ...styles.font.type.primaryRegular,
                    ...styles.font.color.primary,
                    textAlign: "center"
                  }}
                >
                  {this.state.hoursMessage}
                </Text>
              </AnimatedListItem>
            )}
            {this.state.isLoading ? (
              <LoadingIndicator />
            ) : (
              <View style={{ flex: 1 }}>
                {this.state.mealArrayFiltered ? (
                  <DV2ScrollView
                    array={this.state.mealArrayFiltered}
                    render={(dish, index) => this.renderMenu(dish, index)}
                  />
                ) : (
                  <View style={{ flex: 1 }}>
                    <CenterTextView message="No menu items to show." />
                  </View>
                )}
              </View>
            )}
          </View>
        )}
      </View>
    );
  }

  formatted = {
    Alcohol: "alcohol",
    Nuts: "nuts",
    Shellfish: "shellfish",
    Peanut: "peanut",
    Dairy: "dairy",
    Eggs: "eggs",
    Pork: "pork",
    "Fish/Seafood": "fishSeafood",
    Soy: "soy",
    Wheat: "wheat",
    Gluten: "gluten"
  };

  isFiltered = dish => {
    // Check user filter preferences vs dish's allergens
    const filters = this.props.filtersList.data;
    console.log(filters);
    if (filters.Vegetarian && !dish.isVegetarian) {
      return true;
    }
    if (filters.GlutenFree && !dish.isGlutenFree) {
      return true;
    }
    if (filters.Vegan && !dish.isVegan) {
      return true;
    } else {
      for (var index = 0; index < dish.allergens.length; index++) {
        if (filters[this.formatted[dish.allergens[index]]]) {
          return true;
        }
      }
    }
    return false;
  };

  renderMenu = (dish, index) => {
    // render function needed by dv2scrollview
    const filtered = this.isFiltered(dish);
    return (
      <AnimatedListItem key={dish.name} index={index}>
        <Dish key={dish.name} dish={dish} filtered={filtered} />
      </AnimatedListItem>
    );
  };
}

export default connectToRedux(MenuView, [
  sp.menusList,
  sp.diningHallsList,
  sp.filtersList
]);
