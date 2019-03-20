import * as IncrementingActions from './IncrementingActions';
import * as ApplicationStateActions from './ApplicationStateActions';

export const allActions = Object.assign({},
    IncrementingActions,         // TODO: Delete these, just for getting started with Redux
    ApplicationStateActions      // TODO: Delete these, just for getting started with Redux
);