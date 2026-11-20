'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = Object.assign({}, state);
  const stateHistory = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      currentState = Object.assign({}, currentState, action.extraData);
      stateHistory.push(Object.assign({}, currentState));
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        currentState = Object.assign({}, currentState);
        delete currentState[key];
      }
      stateHistory.push(Object.assign({}, currentState));
    }

    if (action.type === 'clear') {
      currentState = {};
      stateHistory.push(Object.assign({}, currentState));
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
