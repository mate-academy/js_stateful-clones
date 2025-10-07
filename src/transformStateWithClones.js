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
    switch (action.type) {
      case 'clear': {
        currentState = {};
        break;
      }

      case 'addProperties': {
        const extra = action.extraData || {};

        currentState = { ...currentState, ...extra };
        break;
      }

      case 'removeProperties': {
        const keys = action.keysToRemove || [];
        const newState = { ...currentState };

        for (const key of keys) {
          delete newState[key];
        }
        currentState = newState;
        break;
      }

      default:
        throw new Error(`Unknown action type: ${action?.type}`);
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
