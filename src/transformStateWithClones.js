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
    } else if (action.type === 'removeProperties') {
      const keysToRemove = action.keysToRemove || [];

      for (const key of keysToRemove) {
        if (currentState.hasOwnProperty(key)) {
          delete currentState[key];
        }
      }
    } else if (action.type === 'clear') {
      currentState = {};
    }
    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
