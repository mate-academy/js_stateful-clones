'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let obj = { ...state };
  const arr = [];

  for (const prop of actions) {
    switch (prop.type) {
      case 'addProperties':
        Object.assign(obj, prop.extraData);
        break;

      case 'removeProperties':
        for (const key of prop.keysToRemove) {
          delete obj[key];
        }
        break;

      case 'clear':
        obj = {};
        break;
    }
    arr.push({ ...obj });
  }

  return arr;
}
module.exports = transformStateWithClones;
