import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

import styles from '../config/styles';

import connectToRedux from '../redux/lib/connectToRedux';

import { DV2ScrollView } from '../components/DV2ScrollView';
import Header from '../components/Header';
import filters from '../config/allFilters';
import BottomTabs from '../components/BottomTabs';



class AllergensView extends Component {

    constructor(props) {
        super(props);
    }
   
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title="I cannot eat..." />
                <View style={{paddingBottom: 50, flex: 1}}>
                    <DV2ScrollView 
                        array={filters}
                        render={(filter) => this.renderAllergen(filter)}
                    />
                </View>
                <BottomTabs viewName={"AllergensView"} />
            </View>
        )
    }


    renderAllergen = (allergen) => {
        return (
            <View 
                key={allergen}
                style={{
                    flex: 1, 
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 20,
                }}
            >
                <Text style={{ 
                    ...styles.font.type.primaryRegular, 
                    ...styles.font.size.medium,
                    alignSelf: 'center',
                }}>
                    {allergen}
                </Text>
                <Switch 
                    value={this.props.allergensList[allergen]} 
                    onValueChange={(value) => this.SwitchChange(value, allergen)}
                />
            </View>
        );
    }

    SwitchChange(value, allergen) {
        this.props.toggleAllergens(value, allergen);
    }
}

export default connectToRedux(AllergensView, ['allergensList']);