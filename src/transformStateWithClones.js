'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  let currentState = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    const newState = { ...currentState };

    if (type === 'clear') {
      Object.keys(newState).forEach((key) => delete newState[key]);
    }

    if (type === 'addProperties') {
      for (const key in extraData) {
        newState[key] = extraData[key];
      }
    }

    if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        delete newState[key];
      }
    }

    result.push(newState);
    currentState = newState;
  }

  return result;
}

module.exports = transformStateWithClones;
