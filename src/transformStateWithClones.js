'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const cloneArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear' :
        Object.keys(stateClone).forEach(key => delete stateClone[key]);
        break;
      case 'addProperties' :
        Object.assign(stateClone, action.extraData);
        break;
      case 'removeProperties' :
        for (const removleKey of action.keysToRemove) {
          delete stateClone[removleKey];
        }
        break;
      default:
        throw new Error('Something wrong, check please');
    }
    cloneArray.push({ ...stateClone });
  }

  return cloneArray;
}

module.exports = transformStateWithClones;
