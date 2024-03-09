'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let currentState = [{ ...state }];
  const stateHistory = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      currentState[0] = { ...currentState[0], ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete currentState[0][key];
      }
    }

    if (action.type === 'clear') {
      currentState = [{}];
    }

    const newState = { ...currentState[0] };

    stateHistory.push(newState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
