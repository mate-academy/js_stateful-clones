'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];

  for (const action of actions) {
    const newState = stateHistory.length
      ? { ...stateHistory[stateHistory.length - 1] }
      : { ...state };

    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        newState[key] = action.extraData[key];
      }
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
    }
    stateHistory.push(newState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
