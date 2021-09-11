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
    if (key.type === 'addProperties') {
      Object.assign(cloneObj, key.extraData);
    }

    if (key.type === 'removeProperties') {
      for (const property of key.keysToRemove) {
        delete cloneObj[property];
      }
    }

    if (key.type === 'clear') {
      for (const property in cloneObj) {
        delete cloneObj[property];
      }
    }

    finalArr.push({ ...cloneObj });
  }

  return finalArr;
}

module.exports = transformStateWithClones;
