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
    if (action.type === 'clear') {
      currentState = {};
    } else if (action.type === 'addProperties') {
      currentState = {
        ...currentState, ...action.extraData,
      };
    } else if (action.type === 'removeProperties') {
      const keysToRemove = action.keysToRemove || [];

      for (const key of keysToRemove) {
        delete currentState[key];
      }
    }
    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
