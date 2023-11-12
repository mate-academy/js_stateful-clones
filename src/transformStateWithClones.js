'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      currentState = {
        ...currentState, ...action.extraData,
      };
    }

    if (action.type === 'removeProperties') {
      for (const keyToRemove of action.keysToRemove) {
        if (currentState.hasOwnProperty(keyToRemove)) {
          delete currentState[keyToRemove];
        }
      }
    }

    if (action.type === 'clear') {
      currentState = {};
    }

    result.push({ ...currentState });
  }

  return result;
}
module.exports = transformStateWithClones;
