'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = state;
  let stateHistory = [];

  for (const key of actions) {
    let newClone = { ...stateClone };

    if (key.type === 'addProperties') {
      for (const data in key.extraData) {
        newClone[data] = key.extraData[data];
      }
    } else if (key.type === 'removeProperties') {
      for (const data of key.keysToRemove) {
        delete newClone[data];
      }
    } else if (key.type === 'clear') {
      newClone = {};
    }
    stateHistory.push(newClone);
    stateClone = newClone;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
