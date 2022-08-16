'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithstateClones(state, actions) {
  const stateClone = { ...state };
  const resArr = [];

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(stateClone, obj.extraData);
        break;

      case 'removeProperties':
        for (const rem of obj.keysToRemove) {
          delete stateClone[rem];
        }
        break;

      case 'clear':
        for (const clear in stateClone) {
          delete stateClone[clear];
        }
        break;

      default:
        throw new Error('Error: obj.type is not defined');
    }
    resArr.push({ ...stateClone });
  }

  return resArr;
}

module.exports = transformStateWithstateClones;
