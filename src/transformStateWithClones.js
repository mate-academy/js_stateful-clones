'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];
  const stateClone = Object.assign({}, state);

  for (const action of actions) {
    const { type, keysToRemove, extraData } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, extraData);
        break;

      case 'removeProperties':
        for (const removeProp of keysToRemove) {
          delete stateClone[removeProp];
        }
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
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
