import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

import connectToRedux from '../redux/lib/connectToRedux';

import NutritionInfoField from '../components/NutritionInfoField';

import styles from '../config/styles';

class NutritionInfo extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Transition appear="bottom">
                    <View style={{ ...styles.container.withPadding, maxHeight: 500 }}>
                        <ScrollView>
                            {Object.keys(this.props.menuItem.data.nutrition).map(field => {
                                    return (
                                        // TODO: Implement this component
                                        <NutritionInfoField
                                            key={field}
                                            field={field}
                                            value={this.props.menuItem.data.nutrition[field]}
                                        />
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </Transition>
            </View>
        );
    }
}

export default connectToRedux(NutritionInfo, ['menuItem']);