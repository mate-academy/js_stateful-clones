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

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(newObj, action.extraData);
        break;

      case 'removeProperties':
        for (const k of action.keysToRemove) {
          delete newObj[k];
        }
        break;

      default :
        for (const key in newObj) {
          delete newObj[key];
        }
    }
    newArr.push({ ...newObj });
  }

  return newArr;
}

module.exports = transformStateWithClones;
