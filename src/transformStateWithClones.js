'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  // write code here
  const newState = { ...state };
  const newArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        for (const keytoRemove of action.keysToRemove) {
          delete newState[keytoRemove];
        }
        break;
      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;
      default:
    }
    newArray.push({ ...newState });
  };

  return newArray;
}

module.exports = transformStateWithClones;
