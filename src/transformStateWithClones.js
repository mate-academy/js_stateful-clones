'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const arr = [];

  const obj = { ...state };

  for (const keys of actions) {
    if (keys.type === 'addProperties') {
      for (const key in keys.extraData) {
        obj[key] = keys.extraData[key];
      }
    }

    if (keys.type === 'removeProperties') {
      for (const i of keys.keysToRemove) {
        delete obj[i];
      }
    }

    if (keys.type === 'clear') {
      for (const j in obj) {
        delete obj[j];
      }
    }

    const final = { ...obj };

    arr.push(final);
  }

  return arr;
}

module.exports = transformStateWithClones;
