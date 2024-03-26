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
    const { keysToRemove, extraData } = action;
    let nextState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        nextState = { ...currentState, ...extraData };
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete nextState[key];
        }
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        break;
    }

    stateHistory.push(nextState);
    currentState = nextState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
