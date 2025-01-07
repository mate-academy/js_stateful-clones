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
    let newState = { ...currentState };

    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    currentState = newState;
    stateHistory.push(currentState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
