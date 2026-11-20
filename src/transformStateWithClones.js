'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = Object.assign({}, state);
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = Object.assign({}, currentState, action.extraData);
        stateHistory.push(Object.assign({}, currentState));
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          currentState = Object.assign({}, currentState);
          delete currentState[key];
        }
        stateHistory.push(Object.assign({}, currentState));
        break;

      case 'clear':
        currentState = {};
        stateHistory.push(Object.assign({}, currentState));
        break;

      default:
        throw new Error('Unknown action type');
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
