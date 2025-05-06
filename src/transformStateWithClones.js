'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const stateHistory = [];

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(newState, obj.extraData);
    }

    if (obj.type === 'removeProperties') {
      for (const key of obj.keysToRemove) {
        delete newState[key];
      }
    }

    if (obj.type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
    }

    stateHistory.push({ ...newState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
