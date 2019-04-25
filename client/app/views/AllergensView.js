import React, { Component } from "react";
import { Switch, Text, View } from "react-native";
import { DV2ScrollView } from "../components/DV2ScrollView";
import Header from "../components/Header";
import allergens from "../config/allAllergens";
import styles from "../config/styles";
import { post } from "../lib/api-utility";
import connectToRedux from "../redux/lib/connectToRedux";
import sp from "../redux/lib/stateProperties";
class AllergensView extends Component {
  constructor(props) {
    super(props);
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

  state = {
    selectedTabName: "Dietary Restrictions"
  };

  // Functions for top tabs
  setRestrictions = () =>
    this.setState({ selectedTabName: "Dietary Restrictions" });
  setAllergies = () => this.setState({ selectedTabName: "Allergies" });

  // Tabs deprecated since Yale's API's vegetarian / vegan classifications are inaccurate
  tabButtons = [
    {
      tabName: "Dietary Restrictions",
      function: this.setRestrictions
    },
    {
      tabName: "Allergies",
      function: this.setAllergies
    }
  ];

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title="Menu Filters" />
        <View
          style={{
            ...styles.container.withPaddingTop,
            ...styles.container.withPaddingBottom
          }}
        />
        <Text
          style={{
            ...styles.font.type.primaryBold,
            ...styles.font.size.large,
            ...styles.font.color.primary,
            paddingHorizontal: 10
          }}
        >
          I cannot eat...
        </Text>
        <View style={{ flex: 1 }}>
          <DV2ScrollView
            array={allergens}
            render={allergen => this.renderAllergen(allergen)}
          />
        </View>
      </View>
    );
  }

  renderAllergen = allergen => {
    return (
      // One allergen name and one switch per row
      <View
        key={allergen}
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20
        }}
      >
        <Text
          style={{
            ...styles.font.type.primaryRegular,
            ...styles.font.size.medium,
            alignSelf: "center"
          }}
        >
          {allergen}
        </Text>
        <Switch
          value={this.props.filtersList.data[this.formatted[allergen]]}
          onValueChange={value => this.toggleAllergen(value, allergen)}
        />
      </View>
    );
  };

  // Toggles allergen and updates the database
  toggleAllergen = async (value, allergen) => {
    const token = this.props.userInformation.notificationID;
    const preference = this.formatted[allergen];
    const postConfig = {
      token,
      preference
    };
    try {
      // access backend to update user filters in firebase
      if (value == false) {
        await post("/api/preferences/delete", postConfig);
        this.props.removeFilter(preference);
      } else {
        await post("/api/preferences", postConfig);
        this.props.addFilter(preference);
      }
    } catch (e) {
      console.error("Filter add/remove error", e.message);
    }
  };
}

export default connectToRedux(AllergensView, [
  sp.userInformation,
  sp.filtersList
]);
