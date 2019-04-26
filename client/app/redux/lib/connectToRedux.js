import { connect } from 'react-redux';
import { mapDispatchToProps } from './mapDispatchToProps';

/**
 * Helper function to easily connect
 * components to different
 * parts of the Redux store
 * (Taken from a medium.com article)
 */
export default function connectToRedux(component, propertiesArray) {
    return connect(state => {
        var newState = {}
        for (var stateValue of propertiesArray) {
            Object.assign(newState, { [stateValue]: state[stateValue] })
        }
        return newState;
    }, mapDispatchToProps)(component)
}