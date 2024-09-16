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
      const updatedState = { ...currentState, ...action.extraData };
      result.push(updatedState);
    } else if (action.type === 'removeProperties') {
      const keysToRemove = action.keysToRemove || [];
      const updatedState = { ...currentState };
      for (const key of keysToRemove) {
        delete updatedState[key];
      }
      result.push(updatedState);
    } else if (action.type === 'clear') {
      result.push({});
    }
    currentState = { ...result[result.length - 1] };
  }

  return result;
}

module.exports = transformStateWithClones;
