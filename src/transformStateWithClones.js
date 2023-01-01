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
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        newArray.push({ ...newState });
        break;

      case 'clear':
        for (const property in newState) {
          delete newState[property];
        }
        newArray.push({ ...newState });
        break;

      case 'removeProperties':
        for (const each of action.keysToRemove) {
          delete newState[each];
        }
        newArray.push({ ...newState });
        break;
    }
  }

  return newArray;
}

module.exports = transformStateWithClones;
