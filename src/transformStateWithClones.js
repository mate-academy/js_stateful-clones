'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateActionsArray = [];
  const clonedState = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(clonedState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete clonedState[key];
        }
        break;

      case 'clear':
        for (const property in clonedState) {
          delete clonedState[property];
        }
        break;

      default:
        throw new Error('Invalid data input');
    }

    stateActionsArray.push({ ...clonedState });
  }

  return stateActionsArray;
}

module.exports = transformStateWithClones;
