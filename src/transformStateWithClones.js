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
    switch (action.type) {
      case 'addProperties':
        if (action.extraData) {
          currentState = {
            ...currentState, ...action.extraData,
          };
          finalState.push({ ...currentState });
        }
        break;

      case 'removeProperties':
        if (action.keysToRemove) {
          const newState = { ...currentState };

          for (const keyToRemove of action.keysToRemove) {
            delete newState[keyToRemove];
          }

          currentState = newState;
          finalState.push({ ...currentState });
        }
        break;

      case 'clear':
        currentState = {};
        finalState.push({ ...currentState });
        break;
    }
  }

  return finalState;
}

module.exports = transformStateWithClones;
