import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';

import styles from '../config/styles';

import connectToRedux from '../redux/lib/connectToRedux';

import { DV2ScrollView } from '../components/DV2ScrollView';
import Header from '../components/Header';
import filters from '../config/allFilters';
import allergens from '../config/allAllergens';
import restrictions from '../config/allRestrictions';
import TopTabs from '../components/TopTabs';
import { post } from '../lib/api-utility';

/** 
 * View that allows users to select their
 * allergen preferences
 * */
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
        'Fish/Seafood': "fishSeafood",
        Soy: "soy",
        Wheat: "wheat",
        Gluten: "gluten"
    }

    // State keeps track of which tab user is on
    state = {
        selectedTabName: 'Dietary Restrictions' // starting tab
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
        },
    ]
   
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title="Menu Filters" />
                <View style={{
                    ...styles.container.withPaddingTop,
                    ...styles.container.withPaddingBottom,
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

    // Renders the JSX for a given allergen
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
                    // TODO: Below line to be used once /api/filters implemented
                    // user filters stored in redux
                    value = {this.props.filtersList.data[this.formatted[allergen]]}
                    onValueChange={(value) => this.OnSwitch(value, allergen)}
                />
            </View>
        );
    }

    // Toggles allergen and updates the database
    OnSwitch = async (value, allergen) => {
        const token = this.props.userInformation.notificationID;
        const preference = this.formatted[allergen];
        const postConfig = {
            token,
            preference
        }
        try {
            // access backend to update user filters in firebase
            if (value == false){
                await post('/api/preferences/delete', postConfig);
                this.props.removeFilter(preference);
            }
            else {
                await post('/api/preferences', postConfig);
                this.props.addFilter(preference);
            }
        } catch (e) {
            console.error("Filter add/remove error", e.message);
        }
    }

}

export default connectToRedux(AllergensView, ['userInformation', 'filtersList']);