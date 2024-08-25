'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state };

  actions.forEach((action) => {
    if (action.type === 'clear') {
      currentState = {};
    } else if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      currentState = { ...currentState };

      action.keysToRemove.forEach((key) => {
        delete currentState[key];
      });
    }

    // Push a clone of the current state to the history
    stateHistory.push({ ...currentState });
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
