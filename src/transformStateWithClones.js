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
    }

    if (action.type === 'addProperties') {
      Object.assign(currentState, action.extraData);
    }

    if (action.type === 'removeProperties' && action.keysToRemove) {
      action.keysToRemove.forEach((key) => {
        delete currentState[key];
      });
    }
    stateHistory.push({ ...currentState });
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
