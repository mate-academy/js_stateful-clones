'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const newObj = { ...state };
  const newArr = [];

  for (const i of actions) {
    switch (i.type) {
      case 'addProperties' :
        Object.assign(newObj, i.extraData);
        newArr.push({ ...newObj });
        continue;

      case 'removeProperties':
        for (const k of i.keysToRemove) {
          delete newObj[k];
        }
        newArr.push({ ...newObj });
        continue;

      default :
        for (const key in newObj) {
          delete newObj[key];
        }
        newArr.push({ ...newObj });
    }
  }

  return newArr;
}

module.exports = transformStateWithClones;
