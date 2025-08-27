'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const curState = { ...state };
  const stateHistory = [];

  for (let i = 0; i < actions.length; i++) {
    const { type, extraData, keysToRemove } = actions[i];

    if (type === 'addProperties') {
      Object.assign(curState, extraData);
    }

    if (type === 'removeProperties') {
      for (const key in keysToRemove) {
        delete curState[keysToRemove[key]];
      }
    }

    if (type === 'clear') {
      for (const key in curState) {
        delete curState[key];
      }
    }
    stateHistory.push({ ...curState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
