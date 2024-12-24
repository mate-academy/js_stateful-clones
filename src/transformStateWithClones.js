'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state }; // a shallow clone of the initial state
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        // Add properties from extraData to the current state
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        // Remove specified keys from the current state
        currentState = { ...currentState }; // Create a clone before modificat

        for (const key of action.keysToRemove) {
          delete currentState[key]; // Remove each key
        }
        break;

      case 'clear':
        // Reset current state to an empty object
        currentState = {};
        break;
    }

    // Push a clone of the updated current state to the history array
    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
