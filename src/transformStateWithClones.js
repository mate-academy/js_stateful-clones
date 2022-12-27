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
        resultArr.push({ ...stateClone });
        break;
      case 'addProperties':
        Object.assign(stateClone, item.extraData);
        resultArr.push({ ...stateClone });
        break;
      case 'removeProperties':
        for (const char of item.keysToRemove) {
          delete stateClone[char];
        }
        resultArr.push({ ...stateClone });
        break;
      default:
        break;
    }
  }

  return resultArr;
}

module.exports = transformStateWithClones;
