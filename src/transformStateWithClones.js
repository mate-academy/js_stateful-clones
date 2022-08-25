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

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(obj, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const char of action.keysToRemove) {
        delete obj[char];
      }
    }

    if (action.type === 'clear') {
      for (const keys in obj) {
        delete obj[keys];
      }
    }
    arr.push({ ...obj });
  }

  return arr;
}

module.exports = transformStateWithClones;
