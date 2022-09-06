'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  const obj = { ...state };

  for (const iterator of actions) {
    if (iterator.type === 'addProperties') {
      for (const key in iterator.extraData) {
        obj[key] = iterator.extraData[key];
      }
      arr.push(Object.assign({}, obj));
    }

    if (iterator.type === 'removeProperties') {
      for (let i = 0; i <= iterator.keysToRemove.length - 1; i++) {
        delete obj[iterator.keysToRemove[i]];
      }
      arr.push(Object.assign({}, obj));
    }

    if (iterator.type === 'clear') {
      for (const key in obj) {
        delete obj[key];
      }
      arr.push(Object.assign({}, obj));
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
