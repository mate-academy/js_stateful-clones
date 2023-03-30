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
      const newState = {};

      for (const [key, value] of Object.entries(currentState)) {
        if (!keysToRemove.includes(key)) {
          newState[key] = value;
        }
      }
      currentState = newState;
    } else if (action.type === 'clear') {
      currentState = {};
    }
    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
