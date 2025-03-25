'use strict';

/**
 * Transforms the state by applying each action in sequence
 *
 * @param {Object} state - The initial state object.
 * @param {Object[]} actions
 * @return {Object[]} - The array of states after each action is applied.
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state }; // Start with the initial state copy

  actions.forEach((action) => {
    let stateCopy = JSON.parse(JSON.stringify(currentState)); // Deep copy

    // Handle each action type
    switch (action.type) {
      case 'clear':
        stateCopy = {}; // Reset the state to an empty object
        break;

      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;

      case 'removeProperties':
        // Remove properties listed in keysToRemove
        action.keysToRemove.forEach((key) => {
          delete stateCopy[key]; // Remove the key from the copy
        });
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    // Update currentState to be the new state and push a copy to history
    currentState = stateCopy;
    stateHistory.push(JSON.parse(JSON.stringify(stateCopy)));
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
