import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';
import connectToRedux from '../redux/lib/connectToRedux';

class HomeView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Transition appear="top">
                    <View>
                        <Text style={styles.title}>Dining*v2</Text>
                    </View>
                </Transition>
                <Transition appear="top">
                    <View>
                        <Text style={styles.subtitle}>Yale Dining, Revamped.</Text>
                    </View>
                </Transition>
                <Transition appear="bottom">
                <View>
                    <TouchableOpacity style={{...styles.bigButton, marginTop: 20}} onPress={() => this.props.navigation.navigate('TabBarView')}>
                        <Text style={styles.bigButtonText}>check out the dhalls</Text>
                    </TouchableOpacity>
                </View>
                </Transition>
                <Transition shared="welcome" appear="top">
                    <View style={{position: 'absolute', backgroundColor: '#4a86e8'}} />
                </Transition>
            </View>
        )
    }
}

const styles =  StyleSheet.create({
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

export default connectToRedux(HomeView, []);