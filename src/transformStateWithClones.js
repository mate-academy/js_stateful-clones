'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      if (
        action.extraData &&
        typeof action.extraData === 'object' &&
        !Array.isArray(action.extraData)
      ) {
        currentState = { ...currentState, ...action.extraData };
      }
    } else if (action.type === 'removeProperties') {
      if (Array.isArray(action.keysToRemove)) {
        const newState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        currentState = newState;
      }
    } else if (action.type === 'clear') {
      currentState = {};
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
