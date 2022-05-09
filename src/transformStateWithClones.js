'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clonedState = { ...state };
  const clonedStateArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clonedState, action.extraData);
        break;

      case 'removeProperties':
        for (const toBeRemoved of action.keysToRemove) {
          if (toBeRemoved in clonedState) {
            delete clonedState[toBeRemoved];
          }
        }
        break;

      case 'clear':
        for (const key in clonedState) {
          delete clonedState[key];
        }
        break;

      default : clonedStateArray.push({ ...clonedState });
    }
    clonedStateArray.push({ ...clonedState });
  }

  return clonedStateArray;
}
module.exports = transformStateWithClones;
