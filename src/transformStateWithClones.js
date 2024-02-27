'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = []; // Array to store previous versions of state
  const newState = { ...state };

  for (const action of actions) {
    // Clone the current state into a new object

    // Apply the action based on its type
    switch (action.type) {
      case 'addProperties':
        // Add properties from extraData to the new state
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        // Remove specified keys from the new state
        for (const key of action.keysToRemove) {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        }
        break;

      case 'clear':
        // Create an empty state object
        for (const key in newState) {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        }
        break;
    }

    result.push({ ...newState }); // Copy the new state in the result array
  }

  return result;
}

module.exports = transformStateWithClones;
