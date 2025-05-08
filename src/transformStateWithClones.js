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
      currentState = { ...currentState, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      const keysToRemove = Array.isArray(action.keysToRemove)
        ? action.keysToRemove
        : [];

      const newState = {};

      for (const key in currentState) {
        if (!keysToRemove.includes(key)) {
          newState[key] = currentState[key];
        }
      }

      currentState = newState;
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
