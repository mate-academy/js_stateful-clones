'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };

  return actions.map((action) => {
    switch (action.type) {
      case 'addProperties':
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties': {
        const newState = { ...currentState };

        action.keysToRemove.forEach((key) => {
          delete newState[key];
        });

        currentState = newState;
        break;
      }

      case 'clear':
        currentState = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    return currentState;
  });
}

module.exports = transformStateWithClones;
