import { bindActionCreators } from 'redux';
import { allActions } from '../actions';

/** Redux method will take in the state and actions
and bind all of the actions we've made to the props
of components connected with Redux */
export function mapDispatchToProps(dispatch) {
    return bindActionCreators(allActions, dispatch);
}