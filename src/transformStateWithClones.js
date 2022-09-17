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
    const { type, extraData, keysToRemove } = obj;

    if (type === 'addProperties') {
      Object.assign(clone, extraData);
    }

    if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        delete clone[key];
      }
    }

    if (type === 'clear') {
      for (const property in clone) {
        delete clone[property];
      }
    }

    const emptyObj = { ...clone };

    arr.push(emptyObj);
  }

  return arr;
}

module.exports = transformStateWithClones;
