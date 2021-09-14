'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const cloneObj = { ...state };
  const finalArr = [];

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        Object.assign(cloneObj, key.extraData);
        break;

      case 'removeProperties':
        for (const property of key.keysToRemove) {
          delete cloneObj[property];
        }
        break;

      case 'clear':
      default:
        for (const property in cloneObj) {
          delete cloneObj[property];
        }
        break;
    }

    finalArr.push({ ...cloneObj });
  }

  return finalArr;
}

module.exports = transformStateWithClones;
