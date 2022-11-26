'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const arr = [];
  const newObj = { ...state };

  for (const el of actions) {
    switch (el.type) {
      case 'addProperties':
        Object.assign(newObj, el.extraData);
        break;

      case 'clear':
        for (const all in newObj) {
          delete newObj[all];
        }
        break;

      case 'removeProperties':
        for (const d of el.keysToRemove) {
          delete newObj[d];
        }
        break;
    }

    arr.push({ ...newObj });
  }

  return arr;
}

module.exports = transformStateWithClones;
