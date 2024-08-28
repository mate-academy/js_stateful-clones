'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = {};

  for (const key in state) {
    if (state.hasOwnProperty(key)) {
      currentState[key] = state[key];
    }
  }

  for (const action of actions) {
    if (action.type === 'clear') {
      currentState = {};
    } else if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        if (action.extraData.hasOwnProperty(key)) {
          currentState[key] = action.extraData[key];
        }
      }
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete currentState[key];
      }
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
