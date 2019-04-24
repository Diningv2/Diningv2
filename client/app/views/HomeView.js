import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import styles from '../config/styles';

import sp from '../redux/lib/stateProperties';
import connectToRedux from '../redux/lib/connectToRedux';

class HomeView extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        buttonText: "check out the dhalls",
        isNavigating: false
    }

    buttonStyle = { ...splashScreenStyles.bigButton, marginTop: 20 };
    proceed = () => {
        this.setState({isNavigating: true, buttonText: "loading..."})
        setTimeout(() => this.props.navigation.navigate('DiningHallsView'), 50);
    }

    componentDidMount() {
        // expoToken needed for device specific information (favorites, filtering preferences)
        const expoToken = this.props.userInformation.notificationID;
        this.props.getFavorites(expoToken);
        this.props.getFilters(expoToken);
    }

    render() {
        // Splash screen - logo with button to navigate to DiningHallsView
        return (
            <View style={splashScreenStyles.container}>
                    <View>
                        <Text style={{...splashScreenStyles.title, ...styles.font.type.primaryBold, ...styles.font.size.extraLarge}}>
                            Dining*v2
                        </Text>
                    </View>
                    <View>
                        <Text style={{...splashScreenStyles.subtitle, ...styles.font.size.medium}}>
                            Get notified when your favorite Yale Dishes™ are being served!
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity 
                            disabled={this.state.isNavigating}
                            style={this.buttonStyle} 
                            onPress={this.proceed}
                        >
                            <Text style={splashScreenStyles.bigButtonText}>
                                {this.state.buttonText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ position: 'absolute', backgroundColor: '#4a86e8' }} />
            </View>
        )
    }
}

const splashScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#4a86e8'
    },
    title: {
        color: '#fff',
        fontFamily: 'Comfortaa Regular'
    },
    subtitle: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Comfortaa Regular'
    },
    bigButton: {
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
    },
    bigButtonText: {
        fontFamily: 'Comfortaa Bold',
        color: '#4a86e8',
    }
})

export default connectToRedux(HomeView, [sp.userInformation]);