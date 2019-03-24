import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../config/styles';
import { Transition } from 'react-navigation-fluid-transitions';

class Gauge extends Component {
    constructor(props) {
        super(props);
    }
    
    colors = {
        none: 'rgba(0,0,0,0.3)',
        low: '#2ecc71',
        medium: '#f1c40f',
        high: '#e67e22',
        veryHigh: '#e74c3c'
    }

    MAX_BUSYNESS = 10;

    gaugeWidth = () => {
        const MARGINAL_WIDTH = '5%';
        if (this.props.busyness) {
            return (this.props.busyness / this.MAX_BUSYNESS) * 100 + '%';
        } else {
            return MARGINAL_WIDTH;
        }
    }
    gaugeColor = () => {
        const { busyness }  = this.props;
        if (busyness <= 0) return this.colors.none;
        if (busyness <= 3) return this.colors.low;
        if (busyness <= 5) return this.colors.medium;
        if (busyness <= 7) return this.colors.high;
        if (busyness <= 10) return this.colors.veryHigh;
        if (busyness <= this.MAX_BUSYNESS) return this.colors.high;
    }

    gaugeStyles = StyleSheet.create({
        container: {
            backgroundColor: 'rgba(0,0,0,0.1)',
            height: 10,
            width: '100%',
            borderRadius: 10,
        },
        gauge: {
            position: 'absolute',
            height: 10,
            borderRadius: 10,
            width: this.gaugeWidth(), 
            backgroundColor: this.gaugeColor() 
        }
    })

    render() {

        return (
            <View style={this.gaugeStyles.container}>
                <View style={this.gaugeStyles.gauge}>
                    <Text> </Text>
                </View>           
            </View>
        )
    }
}

export default class DiningHallItem extends Component {

    isOpenStyle = () => this.props.isOpen ? { opacity: 1 } : { opacity : 0.5}

    render() {
        return (
            <Transition appear="fade">
            <View style={this.isOpenStyle()}>
                <View style={{ ...styles.container.flexRow, ...styles.container.spaceBelow }}>
                    <View style={{ width: '50%' }}>
                        <Text style={{ ...styles.font.type.primaryBold, ...styles.font.size.medium }}>
                            {this.props.name}
                        </Text>
                        <Text style={{ ...styles.font.type.secondaryRegular, opacity: 0.6 }}>
                            {this.props.isOpen ? "Open! 🍽" : "Closed 😞"}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end', width: '50%' }}>
                        <Gauge busyness={this.props.busyness} />
                    </View>
                </View>
            </View>
            </Transition>
        )
    }
}