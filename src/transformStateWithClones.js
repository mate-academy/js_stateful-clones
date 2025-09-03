'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        if (action.extraData) {
          currentState = { ...currentState, ...action.extraData };
        }
        break;

      case 'removeProperties':
        if (action.keysToRemove) {
          const nextState = { ...currentState };

          for (const key of action.keysToRemove) {
            delete nextState[key];
          }
          currentState = nextState;
        }
        break;

      default:
        break;
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
