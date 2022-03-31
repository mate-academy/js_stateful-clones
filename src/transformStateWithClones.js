'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const clone = Object.assign({}, state);
  const result = [];

  for (const key of actions) {
    if (key.type === 'addProperties') {
      Object.assign(clone, key.extraData);
    }

    if (key.type === 'removeProperties') {
      for (const rem of key.keysToRemove) {
        delete clone[rem];
      }
    }

    if (key.type === 'clear') {
      for (const clear in clone) {
        delete clone[clear];
      }
    }
    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
