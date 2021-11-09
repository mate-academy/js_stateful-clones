'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const obj = { ...state };
  const arr = [];

  for (const key of actions) {
    if (key.type === 'addProperties') {
      for (const add in key.extraData) {
        obj[add] = key.extraData[add];
      }
      arr.push({ ...obj });
    }

    if (key.type === 'clear') {
      for (const del in obj) {
        delete obj[del];
      }
      arr.push({});
    }

    if (key.type === 'removeProperties') {
      for (const remove of key.keysToRemove) {
        delete obj[remove];
      }
      arr.push({ ...obj });
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
