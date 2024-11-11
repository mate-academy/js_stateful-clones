'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateHistory = [];
  let currentState = { ...state };
  // Start with a clone of the initial state

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        // Clear the state by setting it to an empty object
        currentState = {};
        break;

      case 'addProperties':
        // Create a new state object with added properties from action.extraData
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        // Create a new object excluding keys listed in action.keysToRemove
        currentState = { ...currentState }; // Clone to avoid mutations

        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    // Save the current state snapshot to the history array
    stateHistory.push(currentState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
