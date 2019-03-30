import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import styles from '../config/styles';

export default class BoolFilters extends Component {
	constructor(props) {
        super(props);
    }
	render() {
        return (
            <View style={{ ...styles.container.flexRow }}>
            	{this.props.veg && 
	            	<View style={{ ...filterStyles.boolFilters }}>
				        <Image style={{ width: 30, height: 37 }} source={require("../../assets/images/boolfilters/veg.png")} />
				    </View>
				}
				{this.props.vegan && 
	            	<View style={{ ...filterStyles.boolFilters }}>
				        <Image style={{ width: 30, height: 37 }} source={require("../../assets/images/boolfilters/vegan.png")} />
				    </View>
				}
				{this.props.gf && 
	            	<View style={{ ...filterStyles.boolFilters }}>
				        <Image style={{ width: 30, height: 37 }} source={require("../../assets/images/boolfilters/gf.png")} />
				    </View>
				}
			</View>
        )
    }
}

const filterStyles = StyleSheet.create({
    boolFilters: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        width: '33.3%'
    }
})