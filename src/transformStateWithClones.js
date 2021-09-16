'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const clone = { ...state };
  const resArr = [];

  for (const key of actions) {
    if (key.type === 'addProperties') {
      Object.assign(clone, key.extraData);
    }

    if (key.type === 'clear') {
      for (const stateKey in clone) {
        delete clone[stateKey];
      }
    }

    if (key.type === 'removeProperties') {
      for (const removeKey of key.keysToRemove) {
        delete clone[removeKey];
      }
    }

    resArr.push({ ...clone });
  }

  return resArr;
}

module.exports = transformStateWithClones;
