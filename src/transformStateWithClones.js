'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state }; // Create a copy of the initial state

  for (const action of actions) {
    if (action.type === 'addProperties') {
      currentState = {
        ...currentState, ...action.extraData,
      };
    } else if (action.type === 'removeProperties') {
      // Create a new state object with specified properties removed
      const { keysToRemove } = action;

      for (const key of keysToRemove) {
        if (currentState.hasOwnProperty(key)) {
          delete currentState[key];
        }
      }
    } else if (action.type === 'clear') {
      // Create an empty state object
      currentState = {};
    }

    // Create a clone of the current state and add it to the result array
    result.push({ ...currentState });
  }

  return result;
}

// Export the function for testing
module.exports = transformStateWithClones;
