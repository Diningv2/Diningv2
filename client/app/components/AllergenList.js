import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

import connectToRedux from '../redux/lib/connectToRedux';

import Allergen from './Allergen';

import styles from '../config/styles';

class AllergenList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <ScrollView>
                    {this.props.menuItem.data.filterProperties.map(allergen => {
                        return (
                            <Allergen
                                key={allergen}
                                title={allergen}
                            />
                        );
                    })}
                </ScrollView>
            </View>
            // <View>
            //     {/* <Transition appear="bottom"> */}
            //         {/* <View style={{ ...styles.container.withPadding}}> */}
            //             {/* <ScrollView> */}
            //                 {this.props.menuItem.isLoading
            //                     ? <Text>Loading...</Text>
            //                     : this.props.menuItem.data.filterProperties.forEach(allergen => {
            //                         console.log("Wheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" + allergen);
            //                         return (
            //                             // TODO: Implement this component
            //                             // <Allergen
            //                             //     key={allergen}
            //                             //     title={allergen}
            //                             // />
            //                             <Text>testing</Text>
            //                         );
            //                     })
            //                 }
            //             {/* </ScrollView> */}
            //         {/* </View> */}
            //     {/* </Transition> */}
            // </View>
        )
    }
}

export default connectToRedux(AllergenList, ['menuItem']);