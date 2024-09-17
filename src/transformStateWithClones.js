'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  // write code here
  const statesArray = [];
  let copiedState = { ...state };

  for (const action of actions) {
    const { extraData, keysToRemove } = action;

    switch (action.type) {
      case 'addProperties':
        Object.assign(copiedState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete copiedState[key];
        }
        break;

      case 'clear':
        copiedState = {};
        break;

      default:
        break;
    }
    statesArray.push({ ...copiedState });
  }

  return statesArray;
}

module.exports = transformStateWithClones;
