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
      case 'addProperties':
        if (
          action.extraData &&
          typeof action.extraData === 'object' &&
          !Array.isArray(action.extraData)
        ) {
          currentState = { ...currentState, ...action.extraData };
        }
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          const newState = { ...currentState };

          for (const key of action.keysToRemove) {
            delete newState[key];
          }
          currentState = newState;
        }
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        break;
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
