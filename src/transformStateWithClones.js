'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const finalState = [];
  let currentState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      if (action.extraData) {
        currentState = {
          ...currentState, ...action.extraData,
        };
        finalState.push({ ...currentState });
      }
    }

    if (action.type === 'removeProperties') {
      if (action.keysToRemove) {
        const newState = { ...currentState };

        for (const keyToRemove of action.keysToRemove) {
          delete newState[keyToRemove];
        }

        currentState = newState;
        finalState.push({ ...currentState });
      }
    }

    if (action.type === 'clear') {
      currentState = {};
      finalState.push({ ...currentState });
    }
  }

  return finalState;
}

module.exports = transformStateWithClones;
