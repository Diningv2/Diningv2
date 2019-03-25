import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

import connectToRedux from '../redux/lib/connectToRedux';

import Allergen from './Allergen';
import { DV2ScrollView } from './DV2ScrollView';

class AllergenList extends Component {

    constructor(props) {
        super(props);
    }

    // render() {
    //     return (
    //         <View>
    //             <ScrollView>
    //                 {this.props.menuItem.data.filterProperties.map(allergen => {
    //                     return (
    //                         <Allergen
    //                             key={allergen}
    //                             title={allergen}
    //                         />
    //                     );
    //                 })}
    //             </ScrollView>
    //         </View>
    //     )
    // }

    renderAllergens = allergen => {
        return (
            <Allergen
                key={allergen}
                title={allergen}
            />
        );
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Transition appear="bottom">
                    <DV2ScrollView 
                        style={{flex: 1}} 
                        array={this.props.menuItem.data.filterProperties}
                        render={allergen => this.renderAllergens(allergen)}
                    />
                </Transition>
            </View>
        );
    }
}

export default connectToRedux(AllergenList, ['menuItem']);