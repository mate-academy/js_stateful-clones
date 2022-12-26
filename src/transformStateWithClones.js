'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const arr = [];

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(clone, obj.extraData);
      arr.push({ ...clone });
    }

    if (obj.type === 'removeProperties') {
      for (const char of obj.keysToRemove) {
        delete clone[char];
      }
      arr.push({ ...clone });
    }

    if (obj.type === 'clear') {
      for (const key in clone) {
        delete clone[key];
      }
      arr.push({ ...clone });
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
