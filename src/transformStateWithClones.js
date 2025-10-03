'use strict';

function transformStateWithClones(state, actions) {
  const results = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        currentState = { ...currentState };

        for (const key of action.keysToRemove || []) {
          delete currentState[key];
        }
        break;
      case 'clear':
        currentState = {};
        break;
      default:
        break;
    }
    results.push({ ...currentState });
  }

  return results;
}

module.exports = transformStateWithClones;
