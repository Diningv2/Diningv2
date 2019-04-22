import React from 'react';
import { View, ScrollView, Text } from 'react-native';

export class DV2ScrollView extends React.Component {
    render() {
        return (
            <View>
                <ScrollView
                    style={{ marginHorizontal: 20 }}
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'space-between',
                        paddingBottom: 10,
                    }}
                    showsVerticalScrollIndicator={false}>
                    <Text style={{ 
                        ...styles.font.type.primaryBold, 
                        ...styles.font.size.large, 
                        ...styles.font.color.primary}}>
                        {this.props.title}
                    </Text>
                    {(this.props.array || []).map((element, index) => {
                        return this.props.render(element, index)
                    })}
                </ScrollView>
            </View>
        )
    }
}