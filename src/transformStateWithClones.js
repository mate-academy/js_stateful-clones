'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const resultArray = [];
  let clonedState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        clonedState = {
          ...clonedState, ...action.extraData,
        };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete clonedState[key];
        }
        break;

      case 'clear':
        clonedState = {};
        break;

      default:
        continue;
    }

    resultArray.push({ ...clonedState });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
