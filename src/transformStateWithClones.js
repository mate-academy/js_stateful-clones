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
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
      Object.assign(state, extraData);
      stateHistory.push({ ...state });
    } else if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        delete state[key];
      }
      stateHistory.push({ ...state });
    } else if (type === 'clear') {
      for (const key in state) {
        delete state[key];
      }
      stateHistory.push({ ...state });
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
