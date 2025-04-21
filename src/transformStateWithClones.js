'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let currentState = { ...state };

  actions.forEach((action) => {
    if (action.type === 'clear') {
      // Reset to an empty object
      currentState = {};
    } else if (action.type === 'addProperties') {
      // Add or overwrite properties
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      // Remove specified properties
      currentState = { ...currentState };

      action.keysToRemove.forEach((key) => {
        delete currentState[key];
      });
    }

    // Capture the current state after applying the action
    states.push({ ...currentState });
  });

  return states;
}

module.exports = transformStateWithClones;
