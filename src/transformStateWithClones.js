'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const stateChange = { ...state };

  for (const key of actions) {
    if (key.type === 'addProperties') {
      Object.assign(stateChange, key.extraData);
    } else if (key.type === 'removeProperties') {
      for (const key1 of key.keysToRemove) {
        delete stateChange[key1];
      }
    } else if (key.type === 'clear') {
      for (const key2 in stateChange) {
        delete stateChange[key2];
      }
    }
    stateHistory.push({ ...stateChange });
  }

  return stateHistory;
}
module.exports = transformStateWithClones;
