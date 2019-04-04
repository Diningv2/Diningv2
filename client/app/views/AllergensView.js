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
                <TopTabs tabButtons={this.tabButtons} />
                <View style={{paddingBottom: 50, flex: 1}}>
                <Text style={{ 
                        ...styles.font.type.primaryBold, 
                        ...styles.font.size.large, 
                        ...styles.font.color.primary,
                        paddingHorizontal: 10}}>
                        {this.state.selectedTabName == 'Dietary Restrictions' ? 'I am...' : 'I cannot eat...'}
                </Text>
                    <DV2ScrollView 
                        array={this.state.selectedTabName == 'Dietary Restrictions' ? restrictions : allergens}
                        render={(allergen) => this.renderAllergen(allergen)}
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