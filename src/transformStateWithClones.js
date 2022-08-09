'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clonedState = { ...state };
  const loggedArray = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(clonedState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          if (key in clonedState) {
            delete clonedState[key];
          }
        }
        break;

      case 'clear':
        for (const key in clonedState) {
          delete clonedState[key];
        }
        break;

      default:
        throw new Error(`Invalid ${type}`);
    }

    loggedArray.push({ ...clonedState });
  }

  return loggedArray;
}

module.exports = transformStateWithClones;
