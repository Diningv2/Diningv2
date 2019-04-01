import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Animated } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import connectToRedux from '../redux/lib/connectToRedux';
import sp from '../redux/lib/stateProperties';

import styles from '../config/styles';

export class Searchbar extends Component {
    state = { searchTerm: "", height: 0 };

    // Sets the local state of text input to be the search term
    setSearchTerm = (searchTerm) => {
        this.setState({searchTerm}, () => { // setState is actually async and needs to run these functions
                                            // only on the new state!
            this.props.onChangeText && this.props.onChangeText(searchTerm); // will run a function 
                                                                            // if onChangeText prop is passed in
            this.props.autoUpdate && this.onSearch(); // will perform on search on text change 
                                                      // if 'autoUpdate' is true
        })
    }

    // Autoresizes TextInput height on text change
    setHeight = (event) => this.setState({height: event.nativeEvent.contentSize.height});

    // Function to be called when the search button is pressed
    // Pass this in as a prop because every search function will
    // be different!
    onSearch = () => this.props.onSearch(this.state.searchTerm);

    constructor(props) {
        super(props);
    }

    searchBarStyles = {
        container: {
            ...styles.container.backgroundColorPrimary, 
            ...styles.container.dropShadow
        },
        textInput: {
            ...styles.font.type.secondaryRegular, 
            ...styles.font.color.secondary,
            ...styles.font.size.medium,
            ...styles.container.withPaddingSmall
        }
    }

    render() {
        return (
            <View style={{...this.searchBarStyles.container}}>
                <View>
                    <View style={{ ...styles.container.flexRow }}>
                        <View style={{width: '80%'}}>
                            <TextInput 
                                multiline
                                style={{
                                    ...this.searchBarStyles.textInput, 
                                    height: Math.max(35, this.state.height)
                                }}
                                onChangeText={this.setSearchTerm} 
                                onContentSizeChange={this.setHeight}
                                value={this.state.searchTerm} 
                                placeholder="Search" />
                        </View>
                        <TouchableOpacity 
                            style={{ paddingLeft: 10 }}
                            onPress={this.onSearch}>
                            <Entypo name="magnifying-glass" size={32} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default connectToRedux(Searchbar, []);