'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const newState = { ...state };
  const result = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      for (const key of Object.keys(newState)) {
        delete newState[key];
      }
      result.push({ ...newState });
    } else if (action.type === 'addProperties') {
      for (const [key, value] of Object.entries(action.extraData)) {
        newState[key] = value;
      }
      result.push({ ...newState });
    } else if (action.type === 'removeProperties') {
      for (const keyToRemove of action.keysToRemove) {
        delete newState[keyToRemove];
      }
      result.push({ ...newState });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
