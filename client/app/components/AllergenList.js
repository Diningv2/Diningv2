import React, { Component } from "react";
import { View } from "react-native";
import { Transition } from "react-navigation-fluid-transitions";

import connectToRedux from "../redux/lib/connectToRedux";

import Allergen from "./Allergen";
import { DV2ScrollView } from "./DV2ScrollView";
import CenterTextView from "./CenterTextView";

class AllergenList extends Component {
    constructor(props) {
        super(props);
    }

    renderAllergens = allergen => {
        return <Allergen key={allergen} title={allergen} />;
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.props.menuItem.data.allergens.length == 0 
                    ? <CenterTextView message="No allergens" />
                    : (
                        <Transition appear="bottom">
                            <DV2ScrollView
                                style={{ flex: 1 }}
                                array={this.props.menuItem.data.allergens}
                                render={allergen => this.renderAllergens(allergen)}
                            />
                        </Transition>
                    )    
                }
            </View>
        );
    }
}

export default connectToRedux(AllergenList, ["menuItem"]);
