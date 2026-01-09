'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateHistory = [];
  const currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;

      case 'clear':
        clearState(currentState);
        break;

      case 'removeProperties':
        clearProperties(currentState, action.keysToRemove);
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    stateHistory.push({ ... currentState });
  }

  return stateHistory;
}

function clearState(state) {
  for (const key in state) {
    delete state[key];
  }
}

function clearProperties(state, properties) {
  for (const key of properties) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
