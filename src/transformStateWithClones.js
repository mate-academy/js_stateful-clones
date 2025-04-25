'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let copyState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      copyState = { ...copyState, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      if (action.keysToRemove) {
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
      }
    }

    if (action.type === 'clear') {
      copyState = {};
    }
    stateHistory.push({ ...copyState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
