'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const result = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      currentState = {};
    }

    if (action.type === 'addProperties') {
      currentState = {
        ...currentState,
        ...action.extraData,
      };
    }

    if (action.type === 'removeProperties') {
      currentState = { ...currentState };

      for (const key of action.keysToRemove) {
        if (currentState.hasOwnProperty(key)) {
          delete currentState[key];
        }
      }
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
