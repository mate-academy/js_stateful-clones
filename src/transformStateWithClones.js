'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      currentState = {};
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete currentState[key];
      }
    }

    if (action.type === 'addProperties') {
      Object.assign(currentState, action.extraData);
    }
    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
//ad