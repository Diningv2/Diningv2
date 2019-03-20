// React/React Native imports
import React, { Component } from 'react';
import { View } from 'react-native';

// Redux imports
import connectToRedux from '../redux/lib/connectToRedux';
import sp from '../redux/lib/stateProperties';

// Custom component imports
import Header from '../components/Header';

// Style library import
import styles from '../config/styles';

class TemplateView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Header title="Template View" />
            </View>
        )
    }
}

// Connects the exported component to Redux
// for access to the Redux store
export default connectToRedux(TemplateView, []);