'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    if (action.type === 'clear') {
      currentState = {};
    }

    if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      const copy = { ...currentState };

      for (const key of action.keysToRemove) {
        delete copy[key];
      }

      currentState = copy;
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
