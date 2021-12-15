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

  for (const ob of actions) {
    const { type, extraData, keysToRemove } = ob;

    if (type === 'addProperties') {
      Object.assign(clone, extraData);
    }

    if (type === 'removeProperties') {
      for (const prop of keysToRemove) {
        delete clone[prop];
      }
    }

    if (type === 'clear') {
      for (const key in clone) {
        delete clone[key];
      }
    }

    arr.push({ ...clone });
  }

  return arr;
}

module.exports = transformStateWithClones;
