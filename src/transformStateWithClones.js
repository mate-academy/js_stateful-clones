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

  for (const item of actions) {
    switch (item.type) {
      case 'clear':
        for (const cleared in obj) {
          delete obj[cleared];
        }
        break;
      case 'addProperties':
        Object.assign(obj, item.extraData);
        break;
      case 'removeProperties':
        for (const key of item.keysToRemove) {
          delete obj[key];
        }
        break;
    }
    arr.push({ ...obj });
  }

  return arr;
}

module.exports = transformStateWithClones;
