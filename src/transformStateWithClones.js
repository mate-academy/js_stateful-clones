'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const result = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
    }

    if (action.type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
    }

    if (action.type === 'removeProperties') {
      for (const key in newState) {
        if (action.keysToRemove.includes(key)) {
          delete newState[key];
        }
      }
    }
    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
