import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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

    buttonStyle = { ...styles.bigButton, marginTop: 20 };
    proceed = () => {
        this.setState({isNavigating: true, buttonText: "loading..."})
        setTimeout(() => this.props.navigation.navigate('DiningHallsView'), 50);
    }

    componentDidMount() {
        const expoToken = this.props.userInformation.notificationID;
        this.props.getFavorites(expoToken);
    }

    render() {
        return (
            <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>
                            Dining*v2
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.subtitle}>
                            Get notified when your favorite Yale Dishes™ are being served!
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity 
                            disabled={this.state.isNavigating}
                            style={this.buttonStyle} 
                            onPress={this.proceed}
                        >
                            <Text style={styles.bigButtonText}>
                                {this.state.buttonText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ position: 'absolute', backgroundColor: '#4a86e8' }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#4a86e8'
    },
    title: {
        fontSize: 50,
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
        fontSize: 16
    }
})

export default connectToRedux(HomeView, [sp.userInformation]);