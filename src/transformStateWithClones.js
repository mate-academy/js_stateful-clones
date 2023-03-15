'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateClone = { ...state };
  const stateArr = [];

  for (const action of actions) {
    switch (action.type) {
      case ('addProperties'):
        Object.assign(stateClone, action.extraData);
        break;

      case ('removeProperties'):
        for (const keyToRemove of action.keysToRemove) {
          delete stateClone[keyToRemove];
        }
        break;

      case ('clear'):
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;

      default:
        throw new Error();
    }
    stateArr.push({ ...stateClone });
  }

  return stateArr;
}

module.exports = transformStateWithClones;
