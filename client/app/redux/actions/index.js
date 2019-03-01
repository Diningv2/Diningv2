import * as IncrementingActions from './IncrementingActions';
import * as ApplicationStateActions from './ApplicationStateActions';

export const allActions = Object.assign({},
    IncrementingActions,
    ApplicationStateActions
);