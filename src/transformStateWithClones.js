'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const resArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties' :
        for (const item of action.keysToRemove) {
          delete stateClone[item];
        }
        break;

      case 'clear' :
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;

      default :
        break;
    }

    resArr.push({ ...stateClone });
  }

  return resArr;
}

module.exports = transformStateWithClones;
