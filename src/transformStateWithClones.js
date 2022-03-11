'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(object, array) {
  const obj = { ...object };
  const newArr = [];

  for (const i of array) {
    switch (i.type) {
      case 'addProperties':
        Object.assign(obj, i.extraData);
        break;

      case 'removeProperties':
        for (const k of i.keysToRemove) {
          delete obj[k];
        }
        break;

      case 'clear':
        for (const k in obj) {
          delete obj[k];
        }
        break;

      default:
        break;
    }
    newArr.push({ ...obj });
  }

  return newArr;
}

module.exports = transformStateWithClones;
