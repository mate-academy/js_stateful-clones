'use strict';

/**
 * Transforms a state object based on a series of actions
 * @param {Object} state - The initial state object
 * @param {Array} actions - Array of action objects
 * @returns {Array} - Array of state objects after each action
 */
function transformStateWithClones(state, actions) {
  // Initialize with a clone of the initial state
  let currentState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        // Create a completely empty state
        currentState = {};
        break;

      case 'addProperties':
        // Add all key-value pairs from extraData
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        // Create a new state without the specified keys
        currentState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;
    }

    // Add the new state to history
    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
