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
    const { type, extraData, keysToRemove } = action;

    let newState = { ...currentState };

    if (type === 'addProperties') {
      for (const key in extraData) {
        newState[key] = extraData[key];
      }
    } else if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        delete newState[key];
      }
    } else if (type === 'clear') {
      newState = {};
    }

    result.push(newState);

    currentState = newState;
  }

  return result;
}

module.exports = transformStateWithClones;
