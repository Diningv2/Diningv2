import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { LoadingIndicator } from '../components/LoadingIndicator';
import styles, { colors } from '../config/styles';

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

    // When button clicked, shows "loading" and times navigation to next view
    proceed = () => {
        this.setState({isNavigating: true, buttonText: "loading..."})
        setTimeout(() => this.props.navigation.navigate('DiningHallsView'), 50);
    }

    // On mount, set Redux state with user's faves and filters, & get dining hall info
    componentDidMount() {
        const expoToken = this.props.userInformation.notificationID;
        this.props.getFavorites(expoToken);
        this.props.getFilters(expoToken);

        if (this.props.diningHallsList && this.props.diningHallsList.isLoading) {
            this.props.getAllDiningHallsInformation();
        }
    }

    // When Redux is ready with dining hall info, go to DiningHallsView
    componentDidUpdate() {
        if (this.props.diningHallsList && !this.props.diningHallsList.isLoading) {
            this.props.navigation.navigate('DiningHallsView')
        }
    }

    // Render just a loading indicator
    // TODO: Decide whether we want the old splash screen back
    render() {
        return (
            <View style={splashScreenStyles.container}>
                {/* <View>
                    <Text style={{
                        ...splashScreenStyles.title, 
                        ...styles.font.type.primaryBold, 
                        ...styles.font.size.extraLarge
                    }}>
                        Dining*v2
                    </Text>
                </View>
                <View>
                    <Text style={{...splashScreenStyles.subtitle, ...styles.font.size.medium}}>
                        Get notified when your favorite Yale Dishes™ are being served!
                    </Text>
                </View> */}
                <View>
                    <LoadingIndicator color={colors.secondary} />
                </View>
                <View style={{ position: 'absolute', backgroundColor: colors.primary }} />
            </View>
        );
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

export default connectToRedux(HomeView, [sp.userInformation, sp.diningHallsList]);