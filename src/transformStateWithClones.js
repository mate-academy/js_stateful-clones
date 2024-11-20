'use strict';

function transformStateWithClones(initialState, actions) {
  return actions.reduce((stateHistory, { type, extraData, keysToRemove }) => {
    const prevState = stateHistory[stateHistory.length - 1] || initialState;
    let newState;

    switch (type) {
      case 'clear':
        newState = {};
        break;
      case 'addProperties':
        newState = Object.assign({}, prevState, extraData);
        break;
      // ... rest of the code remains the same ...}
    }

    return stateHistory.concat(newState);
  }, []);
}
