import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export class DV2ScrollView extends React.Component {
    render() {
        return (
            <View>
                <ScrollView
                    style={{ paddingHorizontal: 20, paddingVertical: 20 }}
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'space-between',
                        paddingBottom: 100 // TODO: fix
                    }}
                    showsVerticalScrollIndicator={false}>
                    {this.props.array.map((element, index) => {
                        return this.props.render(element, index)
                    })}
                </ScrollView>
            </View>
        )
    }
}