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
  const resultingObjArray = [];

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        Object.assign(clone, key.extraData);
        break;
      case 'clear':
        for (const stateKey in clone) {
          delete clone[stateKey];
        }
        break;
      case 'removeProperties':
        for (const removeKey of key.keysToRemove) {
          delete clone[removeKey];
        }
        break;
      default: return null;
    }

    resultingObjArray.push({ ...clone });
  }

  return resultingObjArray;
}

module.exports = transformStateWithClones;
