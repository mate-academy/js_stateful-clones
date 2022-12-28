'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const stateArr = [];

  for (const operation of actions) {
    switch (operation.type) {
      case 'addProperties':
        Object.assign(stateClone, operation.extraData);
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;

      case 'removeProperties':
        for (const removeKey of operation.keysToRemove) {
          delete stateClone[removeKey];
        }
        break;

      default:
        break;
    }
    stateArr.push({ ...stateClone });
  }

  return stateArr;
}

module.exports = transformStateWithClones;
