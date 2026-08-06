'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = state;

  const stateHistory = [];

  for (const action of actions) {
    let newState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;
      case 'clear':
        newState = {};
        break;
      default:
        throw new Error('Invalid action');
    }

    stateHistory.push(newState);
    currentState = newState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
