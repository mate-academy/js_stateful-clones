'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 *
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateHistory = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(state, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const element of action.keysToRemove) {
        delete state[element];
      }
    } else if (action.type === 'clear') {
      for (const key of Object.keys(state)) {
        delete state[key];
      }
    }
    stateHistory.push(state);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
