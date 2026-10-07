'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
    for (const key of actions) {
    if (key.type === 'addProperties') {
      for (const data in key.extraData) {
        state[data] = key.extraData[data];
      }
    } else if (key.type === 'removeProperties') {
      for (const data of key.keysToRemove) {
        delete state[data];
      }
    } else if (key.type === 'clear') {
      for (const data in state) {
        delete state[data];
      }
    }
  }
}

module.exports = transformStateWithClones;
