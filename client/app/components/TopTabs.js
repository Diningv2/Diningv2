import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import connectToRedux from '../redux/lib/connectToRedux';
import styles, { colors } from '../config/styles';

/**
 * General top tab component
 * Takes in an array of TabBut
 */
class TopTabs extends Component {

    constructor(props) {
        super(props);
        this.state.current.function();
    }
    state = {
        // first tab is default selected
        current: this.props.tabButtons[0]
    };
    relativeWidth = () => (100 / this.props.tabButtons.length) + '%';

    /** 
     * Background and text colors change depending on if tab is selected
     * */
    bgColor = (tabButton) => { return (tabButton.tabName == this.state.current.tabName) ? colors.primary : colors.secondary };
    textColor = (tabButton) => { return (tabButton.tabName == this.state.current.tabName) ? colors.secondary : colors.primary };

    render() {
        return (
            <View style={tabStyles.container}>
                <View style={{
                    ...tabStyles.topTabs,
                    borderColor: colors.primary,
                    borderWidth: 0.5
                }}>
                    {this.props.tabButtons.map(tabButton => {
                        return (
                            <TouchableOpacity
                                key={tabButton.tabName}
                                activeOpacity={.3}
                                style={{ 
                                    ...tabStyles.touchables, 
                                    borderColor: colors.primary, 
                                    borderWidth: 0.5, 
                                    backgroundColor: this.bgColor(tabButton), 
                                    width: this.relativeWidth(), 
                                    opacity: tabButton.opacity 
                                }}
                                onPress={() => {
                                    // Only perform function when a different tab is selected 
                                    // (i.e. do not run the function again if that tab is already
                                    // selected)
                                    if (this.state.current.tabName != tabButton.tabName) {
                                        tabButton.function();
                                        this.setState({ current: tabButton });
                                    }
                                }}
                            >
                                <Text style={{ 
                                    ...styles.font.type.primaryBold, 
                                    color: this.textColor(tabButton),
                                    textAlign: 'center',
                                }}>{tabButton.tabName}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        );
    }

}

const tabStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
    },
    topTabs: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    touchables: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    }
})

export default connectToRedux(TopTabs, []);