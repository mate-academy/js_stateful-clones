'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let clonedState = { ...state };
  const clonedStateArray = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(clonedState, extraData);
        break;

      case 'removeProperties':
        for (const toBeRemoved of keysToRemove) {
          delete clonedState[toBeRemoved];
        }
        break;

      case 'clear':
        clonedState = {};
        break;

      default:
        break;
    }
    clonedStateArray.push({ ...clonedState });
  }

  return clonedStateArray;
}
module.exports = transformStateWithClones;
