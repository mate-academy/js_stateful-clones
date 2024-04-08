'use strict';

function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const stateHistory = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        currentState = { ...currentState, ...actions[i].extraData };
        break;

      case 'removeProperties':
        for (const keyToRemove of actions[i].keysToRemove) {
          delete currentState[keyToRemove];
        }
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        break;
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
