import React from 'react';
import { View, ScrollView, Text } from 'react-native';

export class DV2ScrollView extends React.Component {
    render() {
        return (
            <View>
                <ScrollView
                    style={{ marginHorizontal: 15 }}
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'space-between',
                        paddingBottom: 10,
                    }}
                    showsVerticalScrollIndicator={false}>
                    <Text style={{ 
                        // Display title if provided
                        ...styles.font.type.primaryBold, 
                        ...styles.font.size.large, 
                        ...styles.font.color.primary}}>
                        {this.props.title}
                    </Text>
                    {(this.props.array || []).map((element, index) => {
                        // perform passed in render function on each member of array
                        return this.props.render(element, index)
                    })}
                </ScrollView>
            </View>
        )
    }
}