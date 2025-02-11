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
    let newState = { ...currentState };

    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    }

    if (action.type === 'clear') {
      newState = {};
    }

    stateHistory.push(newState);

    currentState = newState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
