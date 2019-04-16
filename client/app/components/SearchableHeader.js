import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { AnimatedListItem } from '../components/Animatable';
import { AntDesign } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { Entypo } from '@expo/vector-icons';

import connectToRedux from '../redux/lib/connectToRedux';
import sp from '../redux/lib/stateProperties';

import styles from '../config/styles';
import Searchbar from '../components/Searchbar';

class SearchableHeader extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.navigation);
    }

    state = {
        searching: false,
        title: this.props.title,
    }

    dHallNames = {
        // "Grace Hopper": "Hopper",
        "Jonathan Edwards": "JE",
        // "Timothy Dwight": "TD",
        "Benjamin Franklin": "Franklin",
    }

    componentDidMount() {
        this.setState({
            title: this.dHallNames[this.props.title] || this.props.title
        })
    }

    // Can go back is enabled if you set the canGoBack prop to true AND
    // you're actually able to go back in the navigation stack
    canGoBack = () => this.props.canGoBack
    goBack = () => this.props.navigation.goBack();
    hasImage = () => this.props.image;

    onPressGlass = () => {
        this.setState(state => {
            return {
                searching: !state.searching,
            }
        });
    }

    render() {
        return (
            <View style={{ ...styles.container.backgroundColorPrimary, ...styles.container.dropShadow }}>
                <View style={{ 
                    ...styles.spacing.above.medium, 
                    paddingVertical: 15, 
                    paddingHorizontal: 10, 
                }}>
                    <View style={{ ...styles.container.flexRow}}>
                        {this.canGoBack() &&
                            <TouchableOpacity 
                                style={{ paddingRight: 10 }}
                                onPress={() => this.goBack()}
                            >
                                <AntDesign name="arrowleft" size={30} color="white" />
                            </TouchableOpacity>
                        }
                        {/* {this.hasImage() &&
                            <View>
                                <Image style={{ width: '10%' }} source={this.props.image} />
                            </View>
                        }?????????????????????????????????????? */}
                        <View>
                            <Text style={{
                                ...styles.font.type.primaryBold, 
                                ...styles.font.size.large, 
                                color: '#fff',
                            }}>{this.state.title}</Text>
                        </View>
                        <View style={{
                            flex: 1, 
                            alignItems: 'flex-end', 
                            minWidth: 40,
                        }}>
                            {!this.state.searching && 
                                <TouchableOpacity 
                                    style={{ paddingLeft: 10 }}
                                    onPress={this.onPressGlass}
                                >
                                    <Entypo name="magnifying-glass" size={30} color="white" />
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                    {this.state.searching &&
                        <View>
                            <AnimatedListItem key="searchbar" index={0}>
                                <Searchbar 
                                    autoUpdate 
                                    onPressGlass={this.onPressGlass}
                                    onSearch={this.props.onSearch} 
                                    onChangeText={this.props.updateSearchTerm} 
                                />
                            </AnimatedListItem>
                        </View>
                    }
                </View>
            </View>
        )
    }
}

export default connectToRedux(withNavigation(SearchableHeader), [sp.nav]);