'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const state1 = {};

  Object.assign(state1, state);

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(state1, action.extraData);

      stateHistory.push({ ...state1 });
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete state1[key];
      }

      stateHistory.push({ ...state1 });
    }

    if (action.type === 'clear') {
      for (const key in state1) {
        delete state1[key];
      }

      stateHistory.push({ ...state1 });
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
