import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

import styles from '../config/styles';

import connectToRedux from '../redux/lib/connectToRedux';

import { DV2ScrollView } from '../components/DV2ScrollView';
import Header from '../components/Header';
import filters from '../config/allFilters';
import allergens from '../config/allAllergens';
import restrictions from '../config/allRestrictions';
import BottomTabs from '../components/BottomTabs';
import TopTabs from '../components/TopTabs';



class AllergensView extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        selectedTabName: 'Dietary Restrictions'
    };

    setRestrictions = () => this.setState({ selectedTabName: 'Dietary Restrictions' });
    setAllergies = () => this.setState({ selectedTabName: 'Allergies' });

    tabButtons = [
        {
            tabName: 'Dietary Restrictions',
            function: this.setRestrictions
        },
        {
            tabName: 'Allergies',
            function: this.setAllergies
        }
        
        
    ]
   
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title="Menu Filters" />
                <View style={{
                    ...styles.topTabs.withPaddingTop,
                    ...styles.topTabs.withPaddingBottom,
                }}>
                    {/* <TopTabs tabButtons={this.tabButtons} /> */}
                </View>
                <Text style={{ 
                        ...styles.font.type.primaryBold, 
                        ...styles.font.size.large, 
                        ...styles.font.color.primary,
                        paddingHorizontal: 10}}>
                        {/* {this.state.selectedTabName == 'Dietary Restrictions' ? 'I am...' : 'I cannot eat...'} */}
                        I cannot eat...
                </Text>
                <View style={{flex: 1}}>
                    <DV2ScrollView 
                        // array={this.state.selectedTabName == 'Dietary Restrictions' ? restrictions : allergens}
                        array={allergens}

                        render={(allergen) => this.renderAllergen(allergen)}
                    />
                </View>
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