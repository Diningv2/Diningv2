import { connect } from 'react-redux';
import { mapDispatchToProps } from './mapDispatchToProps';

export default function connectToRedux(component, propertiesArray) {
    return connect(state => {
        var newState = {}
        for (var stateValue of propertiesArray) {
            Object.assign(newState, { [stateValue]: state[stateValue] })
        }
        return newState;
    }, mapDispatchToProps)(component)
}