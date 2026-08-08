'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };

  return actions.map((action) => {
    switch (action.type) {
      // Replace the current state with a new empty object.
      case 'clear':
        currentState = {};
        break;

      // Add or overwrite the provided properties without mutating the state.
      case 'addProperties':
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      // Remove the requested properties from a clone of the current state.
      case 'removeProperties': {
        const newState = { ...currentState };

        action.keysToRemove.forEach((key) => {
          delete newState[key];
        });

        currentState = newState;
        break;
      }

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    return currentState;
  });
}

module.exports = transformStateWithClones;
