'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const newStateArray = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
      newStateArray.push({ ...newState });
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        if (key in newState) {
          delete newState[key];
        }
      }
      newStateArray.push({ ...newState });
    }

    if (action.type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
      newStateArray.push({ ...newState });
    }
  }

  return newStateArray;
}

module.exports = transformStateWithClones;
