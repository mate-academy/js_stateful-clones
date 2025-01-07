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

  actions.forEach((action) => {
    let newState;

    switch (action.type) {
      case 'clear':
        // Create a new empty state object
        newState = {};
        break;

      case 'addProperties':
        // Clone the current state and add new properties from `extraData`
        newState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        // Clone the current state and remove specified keys
        newState = { ...currentState };

        action.keysToRemove.forEach((key) => {
          delete newState[key];
        });
        break;

      default:
        // If the action type is unknown, we just clone the state as is
        newState = { ...currentState };
    }

    // Push the new state into the result array
    result.push(newState);

    // Update currentState for the next action to work on
    currentState = newState;
  });

  return result;
}

module.exports = transformStateWithClones;
