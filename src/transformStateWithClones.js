'use strict';

function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state }; // clone initial state to avoid modifying it

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        currentState = { ...currentState }; // shallow clone

        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;

      default:
        // Ignore unknown action types
        continue;
    }

    result.push(currentState);
  }

  return result;
}

module.exports = transformStateWithClones;
