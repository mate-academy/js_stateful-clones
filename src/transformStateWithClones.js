'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = state;

  for (const action of actions) {
    let nextState = {};

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;

      case 'addProperties':
        nextState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        nextState = { ...currentState };

        if (Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete nextState[key];
          }
        }
        break;

      default:
        nextState = { ...currentState };
        break;
    }

    currentState = nextState;

    stateHistory.push(currentState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
