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
  let newArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);

        const newState1 = { ...newState };

        newArray.push(newState1);
        break;
      case 'removeProperties':
        for (const keytoRemove of action.keysToRemove) {
          delete newState[keytoRemove];
        }

        const state2 = { ...newState };

        newArray.push(state2);
        break;
      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }

        const state3 = { ...newState };

        newArray.push(state3);
        break;
      default:
    }
  };

  return newArray;
}

module.exports = transformStateWithClones;
