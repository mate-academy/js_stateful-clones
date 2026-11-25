'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here

  const CLEAR = 'clear';
  const ADD = 'addProperties';
  const REMOVE = 'removeProperties';

  const stateHistory = [];
  let currentState = { ...state };

  for (const action of actions) {
    let nextState = { ...currentState };

    switch (action.type) {
      case CLEAR:
        nextState = {};
        break;

      case ADD:
        Object.assign(nextState, action.extraData);
        break;

      case REMOVE:
        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    stateHistory.push(nextState);
    currentState = nextState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
