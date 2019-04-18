import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
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
        if (!this.props.isOpen) {
            return '0%';
        }
        if (this.props.busyness) {
            return (this.props.busyness / this.MAX_BUSYNESS) * 100 + '%';
        } else {
            return MARGINAL_WIDTH;
        }
    }

    gaugeColor = () => {
        const { busyness } = this.props;
        if (busyness <= 0) return this.colors.none;
        if (busyness <= 3) return this.colors.low;
        if (busyness <= 5) return this.colors.medium;
        if (busyness <= 7) return this.colors.high;
        if (busyness <= 10) return this.colors.veryHigh;
        if (busyness <= this.MAX_BUSYNESS) return this.colors.veryHigh;
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

    isOpenStyle = () => this.props.isOpen ? { opacity: 1 } : { opacity: 0.9 }

    imageSource = () => {
        switch (this.props.name) {
            case "Berkeley": return require("../../assets/images/crests/Berkeley.png");
            case "Branford": return require("../../assets/images/crests/Branford.png");
            case "Grace Hopper": return require("../../assets/images/crests/Grace_Hopper.png");
            case "Davenport": return require("../../assets/images/crests/Davenport.png");
            case "Jonathan Edwards": return require("../../assets/images/crests/Jonathan_Edwards.png");
            case "Morse": return require("../../assets/images/crests/Morse.png");
            case "Pierson": return require("../../assets/images/crests/Pierson.png");
            case "Saybrook": return require("../../assets/images/crests/Saybrook.png");
            case "Silliman": return require("../../assets/images/crests/Silliman.png");
            case "Stiles": return require("../../assets/images/crests/Ezra_Stiles.png");
            case "Timothy Dwight": return require("../../assets/images/crests/Timothy_Dwight.png");
            case "Trumbull": return require("../../assets/images/crests/Trumbull.png");
            case "Pauli Murray": return require("../../assets/images/crests/Pauli_Murray.png");
            case "Franklin": return require("../../assets/images/crests/Benjamin_Franklin.png");
            default: return require("../../assets/images/crests/Yale_College.png")
        }
    }

    render() {
        return (
            <Transition appear="fade">
                <View style={this.isOpenStyle()}>
                    <View style={{ ...styles.container.flexRow, ...styles.container.spaceBelow }}>
                        <View style={{ width: '10%' }}>
                            <Image resizeMode='contain'
                                style={{ flex: 1, width: undefined, height: undefined }}
                                source={this.imageSource()}
                            />
                        </View>
                        <View style={{ width: '2.5%' }} />
                        <View style={{ width: '47.5%' }}>
                            <Text style={{ ...styles.font.type.primaryBold, ...styles.font.size.medium }}>
                                {this.props.name}
                            </Text>
                            <Text style={{ ...styles.font.type.primaryRegular, opacity: 0.6 }}>
                                {this.props.isOpen ? "Open! 🍽" : "Closed 😞"}
                            </Text>
                        </View>
                        <View style={{ width: '5%' }} />
                        <View style={{ alignItems: 'flex-end', width: '35%' }}>
                            <Gauge busyness={this.props.busyness} isOpen={this.props.isOpen} />
                        </View>
                    </View>
                </View>
            </Transition>
        )
    }
}