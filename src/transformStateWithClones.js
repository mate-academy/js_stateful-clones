'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state }; // Create a copy of the initial state

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        result.push({ ...currentState });
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (currentState.hasOwnProperty(key)) {
            delete currentState[key];
          }
        }
        result.push({ ...currentState });
        break;
      case 'clear':
        currentState = {};
        result.push({ ...currentState });
        break;
      default:
        result.push({ ...currentState });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
