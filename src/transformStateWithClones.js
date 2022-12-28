'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateNew = { ...state };
  const stateArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(stateNew, action.extraData);
        break;

      case 'removeProperties' :
        for (const removeItem of action.keysToRemove) {
          delete stateNew[removeItem];
        }
        break;

      case 'clear' :
        for (const key in stateNew) {
          delete stateNew[key];
        }
        break;

      default :
        break;
    }
    stateArr.push({ ...stateNew });
  }

  return stateArr;
}

module.exports = transformStateWithClones;
