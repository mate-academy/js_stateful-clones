'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state }; // Create a clone of the initial state

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        currentState = {}; // Clear the state
        break;
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete currentState[key]; // Remove specified keys
        });
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    stateHistory.push({ ...currentState }); // Save a clone of the current state
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
