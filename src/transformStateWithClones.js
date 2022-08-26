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
    switch (action.type) {
      case 'addProperties':
        Object.assign(obj, action.extraData);
        break;

      case 'removeProperties':
        for (const char of action.keysToRemove) {
          delete obj[char];
        }
        break;

      case 'clear':
        for (const keys in obj) {
          delete obj[keys];
        }
    }

    arr.push({ ...obj });
  }

  return arr;
}

module.exports = transformStateWithClones;
