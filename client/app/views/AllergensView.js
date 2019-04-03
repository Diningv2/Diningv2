import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Switch } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

import styles from '../config/styles';

import connectToRedux from '../redux/lib/connectToRedux';

import DiningHallItem from '../components/DiningHallItem';
import ListItem from '../components/ListItem';
import { DV2ScrollView } from '../components/DV2ScrollView';
import Header from '../components/Header';
import filters from '../config/allFilters';



class AllergensView extends Component {

    constructor(props) {
        super(props);
    }

    

   
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title="I cannot eat..." />
               
                    <View>
                        <DV2ScrollView style={{ flex: 1 }}
                            array={filters}
                            render={(element, index) => this.renderAllergen(element, index)}
                        />
                    </View>
                
                
            </View>
        )
    }


    renderAllergen = (allergen) => {
        return (
            
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <ListItem title={allergen} />
                    <Switch value = {this.props.allergensList[allergen]} onValueChange={(value) => this.SwitchChange(value, allergen)}/>
                </View>
        );
    }

    SwitchChange(value, allergen) {
        console.log("Aaaaaaaaaaaa " + allergen);
        console.log("AAAAAAAAA " + value);
        this.props.toggleAllergens(value, allergen);
    }
}

export default connectToRedux(AllergensView, ['allergensList']);