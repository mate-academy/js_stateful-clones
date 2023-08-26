'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const clone = { ...state };
  const arr = [];

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(clone, obj.extraData);
        break;
      case 'removeProperties':
        for (const key of obj.keysToRemove) {
          delete clone[key];
        }
        break;
      case 'clear':
        Object.keys(clone).forEach(key => delete clone[key]);
        break;
    }

    arr.push({ ...clone });
  }

  return arr;
}

module.exports = transformStateWithClones;
