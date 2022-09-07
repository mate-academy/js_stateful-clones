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
    switch (iterator.type) {
      case 'addProperties': {
        for (const key in iterator.extraData) {
          obj[key] = iterator.extraData[key];
        }
        arr.push(Object.assign({}, obj));
        break;
      }

      case 'removeProperties': {
        for (let i = 0; i <= iterator.keysToRemove.length - 1; i++) {
          delete obj[iterator.keysToRemove[i]];
        }
        arr.push(Object.assign({}, obj));
        break;
      }

      case 'clear' : {
        for (const key in obj) {
          delete obj[key];
        }
        arr.push(Object.assign({}, obj));
        break;
      }
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
