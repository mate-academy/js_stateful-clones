'use strict';

/**
 * @param {Object} state - Initial state object.
 * @param {Object[]} actions - List of actions to apply to the state.
 * @return {Object[]} - An array of states after each action.
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state };

  // Iterate over the actions and apply each one
  actions.forEach((action) => {
    let newState;

    switch (action.type) {
      case 'clear':
        // Create an empty state object
        newState = {};
        break;

      case 'addProperties':
        // Create a new state by adding the properties from extraData
        newState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        // Create a new state and remove properties from keysToRemove
        newState = { ...currentState }; // Copy the current state first

        action.keysToRemove.forEach((key) => {
          delete newState[key]; // Remove the specified keys
        });
        break;

      default:
        // Instead of logging, we just ignore unknown actions
        newState = { ...currentState };
        break;
    }

    // Save the updated state to the history
    stateHistory.push(newState);

    // Update the current state for the next iteration
    currentState = newState;
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
