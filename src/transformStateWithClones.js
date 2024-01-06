'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      const newState = result.length
        ? { ...result[result.length - 1] } : { ...state };

      for (const key in action.extraData) {
        newState[key] = action.extraData[key];
      }
      result.push(newState);
    }

    if (action.type === 'removeProperties') {
      const newState = result.length
        ? { ...result[result.length - 1] } : { ...state };

      for (const key of action.keysToRemove) {
        delete newState[key];
      }
      result.push(newState);
    }

    if (action.type === 'clear') {
      result.push({});
    }
  }

  return result;
}

module.exports = transformStateWithClones;
