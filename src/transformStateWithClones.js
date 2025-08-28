'use strict';

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let lastState = { ...state };

  for (const action of actions) {
    let currentState = { ...lastState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        throw new Error('Unknown action type: ' + action.type);
    }

    stateHistory.push(currentState);
    lastState = currentState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
