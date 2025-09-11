'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        const updatedState = {};

        for (const key in currentState) {
          if (!action.keysToRemove.includes(key)) {
            updatedState[key] = currentState[key];
          }
        }
        currentState = updatedState;
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
