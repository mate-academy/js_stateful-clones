'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const obj = {};
  const arr = [];

  for (const key in state) {
    obj[key] = state[key];
  }

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        for (const key in extraData) {
          obj[key] = extraData[key];
        }
        break;
      case 'removeProperties':
        for (const key in keysToRemove) {
          delete obj[keysToRemove[key]];
        }
        break;
      case 'clear':
        for (const key in obj) {
          delete obj[key];
        }
        break;
      default:
    }
    arr.push(Object.assign({}, obj));
  }

  return arr;
}

module.exports = transformStateWithClones;
