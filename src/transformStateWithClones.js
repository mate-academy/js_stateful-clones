'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code herez
  const result = []; // Array to store each new state

  // Clone the initial state to start with
  let currentState = { ...state };

  for (const action of actions) {
    // Clone the current state for each action
    currentState = { ...currentState };

    // Apply action based on its type
    if (action.type === 'clear') {
      currentState = {}; // Create a new empty object
    } else if (action.type === 'addProperties') {
      // Add all properties from extraData to the state
      Object.assign(currentState, action.extraData);
    } else if (action.type === 'removeProperties') {
      // Remove each key in keysToRemove, if it exists in the state
      for (const key of action.keysToRemove) {
        delete currentState[key];
      }
    }

    // Push the modified state to the result array
    result.push(currentState);
  }

  return result; // Return the array of states after each action
}

module.exports = transformStateWithClones;
