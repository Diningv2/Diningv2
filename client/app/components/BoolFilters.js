import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import styles from '../config/styles';

export default class BoolFilters extends Component {
	constructor(props) {
        super(props);
    }
	render() {
        return (
            <View style={{ ...styles.container.flexRow, height:'7%' }}>
            	{this.props.veg && 
	            	<View style={{ width: '33.3%' }}>
				        <Image resizeMode='contain' style={{ flex: 1, width: undefined, height: undefined }}
				        	source={require("../../assets/images/boolfilters/veg.png")} />
				    </View>
				}
				{this.props.vegan && 
	            	<View style={{ width: '33.3%' }}>
				        <Image resizeMode='contain' style={{ flex: 1, width: undefined, height: undefined }}
				        	source={require("../../assets/images/boolfilters/vegan.png")} />
				    </View>
				}
				{this.props.gf && 
	            	<View style={{ width: '33.3%' }}>
				        <Image resizeMode='contain' style={{ flex: 1, width: undefined, height: undefined }}
				        	source={require("../../assets/images/boolfilters/gf.png")} />
				    </View>
				}
			</View>
        )
    }
}
