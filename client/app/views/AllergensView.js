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
import { post } from '../lib/api-utility';



class AllergensView extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        selectedTabName: 'Dietary Restrictions'
    };

    // functions for top tabs
    setRestrictions = () => this.setState({ selectedTabName: 'Dietary Restrictions' });
    setAllergies = () => this.setState({ selectedTabName: 'Allergies' });

    // Tabs deprecated since Yale's API's vegetarian / vegan classifications are inaccurate
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
            // One allergen name and one switch per row
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
                    // TODO: Below line to be used once /api/filters implemented
                    // user filters stored in redux
                    // value = {this.props.filtersList.data[allergen]}
                    onValueChange={(value) => this.SwitchChange(value, allergen)}
                />
            </View>
        );
    }

    SwitchChange(value, allergen) {
        this.props.toggleAllergens(value, allergen);
    }

    // OnSwitch to be used once /api/filters is implemented
    // Toggles allergen and updates the database
    OnSwitch = async (value, allergen) => {
        const token = this.props.userInformation.notificationID;
        const postConfig = {
            token,
            allergen
        }
        try {
            // access backend to update user filters in firebase
            if (value == true){
                await post('/api/filters/delete', postConfig);
                this.props.removeFilter(allergen);
            }
            else {
                await post('api/filters', postConfig);
                this.props.addFilter(allergen);
            }
        } catch (e) {
            console.error("Filter add/remove error", e.message);
        }

        

    }
}

export default connectToRedux(AllergensView, ['allergensList', 'userInformation', 'filtersList']);