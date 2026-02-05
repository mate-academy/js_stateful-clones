'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const results = [];
  let currentState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      currentState = Object.assign({ ...currentState }, action.extraData);
    }

    if (action.type === 'removeProperties') {
      currentState = { ...currentState };

      for (const key of action.keysToRemove) {
        delete currentState[key];
      }
    }

    if (action.type === 'clear') {
      currentState = {};
    }
    results.push({ ...currentState });
  }

  return results;
}

module.exports = transformStateWithClones;
