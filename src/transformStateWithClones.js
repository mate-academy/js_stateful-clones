'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // Array to store states after each action
  const stateHistory = [];
  let currentState = Object.assign({}, state);

  for (const action of actions) {
    if (action.type === 'clear') {
      // For 'clear', create a brand new empty object
      currentState = {};
    } else if (action.type === 'addProperties') {
      currentState = Object.assign({}, currentState, action.extraData);
    } else if (action.type === 'removeProperties') {
      const newState = Object.assign({}, currentState);

      for (const key of action.keysToRemove) {
        delete newState[key];
      }
      currentState = newState;
    }
    stateHistory.push(Object.assign({}, currentState));
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
