'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      newState = { ...newState, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      for (const removeKey of action.keysToRemove) {
        delete newState[removeKey];
      }
    }

    if (action.type === 'clear') {
      newState = {};
    }
    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
