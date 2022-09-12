'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const copy = { ...state };
  const arr = [];

  for (const key of actions) {
    const object = {};

    if (key.type === 'addProperties') {
      Object.assign(copy, key.extraData);
    }

    if (key.type === 'removeProperties') {
      for (const remove of key.keysToRemove) {
        delete copy[remove];
      }
    }

    if (key.type === 'clear') {
      for (const properties in copy) {
        delete copy[properties];
      }
    }
    arr.push(Object.assign(object, copy));
  }

  return arr;
}

module.exports = transformStateWithClones;
