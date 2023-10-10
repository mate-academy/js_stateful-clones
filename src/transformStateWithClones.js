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
  // Create a shallow clone of the initial state

  for (const action of actions) {
    if (action.type === 'addProperties') {
      currentState = {
        ...currentState, ...action.extraData,
      };
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete currentState[key];
      }
    } else if (action.type === 'clear') {
      currentState = {};
    }

    // Create a shallow clone of the current state and add it to the result
    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
