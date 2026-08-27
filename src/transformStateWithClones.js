'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let currentState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    let nextState;

    switch (action.type) {
      case 'addProperties':
        nextState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties': {
        const stateCopy = { ...currentState };

        action.keysToRemove.forEach((key) => delete stateCopy[key]);
        nextState = stateCopy;
        break;
      }

      case 'clear':
        nextState = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    currentState = nextState;
    stateHistory.push(currentState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
