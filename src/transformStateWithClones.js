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

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {}; // Reset the state to an empty object
        break;
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        // Remove the specified keys from the state
        currentState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;
      default:
        throw new Error('Unknown action type');
    }

    // Add a snapshot of the current state to the history
    stateHistory.push(currentState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
