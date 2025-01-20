'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state }; // Clone the initial state

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {}; // Clear the state
        break;

      case 'addProperties':
        currentState = {
          ...currentState,
          ...action.extraData,
        }; // Add properties
        break;

      case 'removeProperties':
        currentState = { ...currentState }; // Clone current state

        for (const key of action.keysToRemove) {
          delete currentState[key]; // Remove specified keys
        }
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    stateHistory.push(currentState); // Push the updated state to history
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
