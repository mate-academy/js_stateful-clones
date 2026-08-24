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
    const newState = { ...currentState };

    if (action.type === 'clear') {
      currentState = {};
    }

    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
      currentState = newState;
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }

      currentState = newState;
    }

    stateHistory.push(currentState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
