'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesHistory = [];
  let currentState = { ...state };

  for (const action of actions) {
    let nextState;

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;

      case 'addProperties':
        nextState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        nextState = { ...currentState };

        if (Array.isArray(action.keysToRemove)) {
          action.keysToRemove.forEach((key) => {
            delete nextState[key];
          });
        }
        break;

      default:
        nextState = { ...currentState };
    }

    statesHistory.push(nextState);
    currentState = nextState;
  }

  return statesHistory;
}

module.exports = transformStateWithClones;
