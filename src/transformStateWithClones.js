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
    let newState = { ...currentState };

    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const keyToRemove of action.keysToRemove) {
        delete newState[keyToRemove];
      }
    } else if (action.type === 'clear') {
      newState = {}; // Create an empty state object
    }

    result.push(newState); // Add the transformed state to the result array
    currentState = newState; // Update the current state for the next iteration
  }

  return result;
}
module.exports = transformStateWithClones;
