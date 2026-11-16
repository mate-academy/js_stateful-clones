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

    currentState = { ...currentState };

    if (type === 'addProperties') {
      Object.assign(currentState, extraData);
    }

    if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        delete currentState[key];
      }
    }

    if (type === 'clear') {
      currentState = {};
    }

    result.push(currentState);
  }

  return result;
}

module.exports = transformStateWithClones;
