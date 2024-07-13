'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const results = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        if (action.keysToRemove && action.keysToRemove.length > 0) {
          for (const key of action.keysToRemove) {
            if (currentState.hasOwnProperty(key)) {
              delete currentState[key];
            }
          }
        }
        break;
      default:
        continue;
    }

    results.push({ ...currentState });
  }

  return results;
}

module.exports = transformStateWithClones;
