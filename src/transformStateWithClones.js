'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const newArray = [];
  const newState = { ...state };

  for (const action of actions) {
    const { extraData, keysToRemove } = action;

    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, extraData);
        break;

      case 'clear':
        for (const property in newState) {
          delete newState[property];
        }
        break;

      case 'removeProperties':
        for (const each of keysToRemove) {
          delete newState[each];
        }
        break;

      default:
        break;
    }

    newArray.push({ ...newState });
  }

  return newArray;
}

module.exports = transformStateWithClones;
