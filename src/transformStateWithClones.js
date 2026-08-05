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
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties': {
        const newState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }

        currentState = newState;
        break;
      }

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
