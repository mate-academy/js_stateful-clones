'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const actualState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(actualState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete actualState[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in actualState) {
        delete actualState[key];
      }
    }

    stateHistory.push({ ...actualState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
