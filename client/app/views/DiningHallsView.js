// React/React Native imports
import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';
import DiningHallItem from '../components/DiningHallItem';
import { DV2ScrollView } from '../components/DV2ScrollView';

// Custom component imports
import Header from '../components/Header';
import dHallIDs from '../config/dHallIDs';

// Style library import
import styles, { colors } from '../config/styles';

// Redux imports
import connectToRedux from '../redux/lib/connectToRedux';






class DiningHallsView extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.diningHallsList.isLoading) {
            this.props.getAllDiningHallsInformation();
        }
    }

    renderDiningHall = (diningHall, index) => {
        return (
            <TouchableOpacity 
                key={diningHall.name}
                onPress={() => {
                    this.props.getMenus(dHallIDs[diningHall.name]); // Set redux state with menu for this dHall
                    this.props.navigation.navigate('MenuView');
                    console.log("Sanity");
                }}  
            >
                <DiningHallItem
                    name={diningHall.name} 
                    isOpen={diningHall.isOpen}
                    busyness={diningHall.busyness}                       
                />
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title="Dining Halls" />
                {!this.props.diningHallsList.isLoading &&
                    <View>
                        <DV2ScrollView style={{flex: 1}}
                            array={this.props.diningHallsList.data}
                            render={(element, index) => this.renderDiningHall(element, index)} 
                        />
                    </View>
                }
                {this.props.diningHallsList.isLoading && 
                    <Transition appear="bottom">
                    <View style={{...styles.container.center}}>
                        <Text style={{...styles.font.type.primaryRegular, ...styles.font.color.primary}}>Loading...</Text>
                    </View>
                    </Transition>
                }
            </View>
        )
    }
}

export default connectToRedux(DiningHallsView, ['diningHallsList']);