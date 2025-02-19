'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state }; // Clone initial state
  const history = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        currentState = {}; // Reset state to an empty object
        break;
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        currentState = { ...currentState }; // Clone before removing properties
        action.keysToRemove.forEach((key) => delete currentState[key]);
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`); // Handle unknown action types
    }

    history.push({ ...currentState }); // Store a copy of the new state
  });

  return history;
}

module.exports = transformStateWithClones;
