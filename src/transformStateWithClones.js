'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const newState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        if (newState.hasOwnProperty(key)) {
          delete newState[key];
        }
      }
    }

    if (action.type === 'clear') {
      Object.keys(newState).forEach(key => (delete newState[key]));
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
