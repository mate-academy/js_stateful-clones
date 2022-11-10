'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArr = [];
  const newState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const [key, value] of Object.entries(action.extraData)) {
        newState[key] = value;
      }
      newArr.push({ ...newState });
    }

    if (action.type === 'removeProperties') {
      for (const keyToRemove of action.keysToRemove) {
        delete newState[keyToRemove];
      }
      newArr.push({ ...newState });
    }

    if (action.type === 'clear') {
      for (const stat in newState) {
        delete newState[stat];
      }
      newArr.push({ ...newState });
    }
  }

  return newArr;
}

module.exports = transformStateWithClones;
