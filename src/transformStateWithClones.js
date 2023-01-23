'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const newState = {
    ...state,
  };
  const result = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }

      result.push({
        ...newState,
      });
    }

    if (action.type === 'removeProperties') {
      for (const keyToRemoveProperties of action.keysToRemove) {
        delete newState[keyToRemoveProperties];
      }

      result.push({
        ...newState,
      });
    }

    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        newState[key] = action.extraData[key];
      }

      result.push({
        ...newState,
      });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
