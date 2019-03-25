import React, { Component } from 'react';
import { View } from 'react-native';

import connectToRedux from '../redux/lib/connectToRedux';

import Header from '../components/Header';
import BottomTabs from '../components/BottomTabs';

class TemplateView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title="Template View" />
                <BottomTabs viewName={'TemplateView'} />
            </View>
        )
    }
}

// Connects the exported component to Redux
// for access to the Redux store
export default connectToRedux(TemplateView, []);