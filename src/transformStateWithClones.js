'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const resultArr = [];

  for (const item of actions) {
    switch (item.type) {
      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
      case 'addProperties':
        Object.assign(stateClone, item.extraData);
        break;
      case 'removeProperties':
        for (const char of item.keysToRemove) {
          delete stateClone[char];
        }
        break;
      default:
        break;
    }
    resultArr.push({ ...stateClone });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
