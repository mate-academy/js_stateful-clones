'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let copyVersion = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      copyVersion = { ...copyVersion, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete copyVersion[key];
      }
    } else if (action.type === 'clear') {
      for (const key in copyVersion) {
        delete copyVersion[key];
      }
    }
    stateHistory.push({ ...copyVersion });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
