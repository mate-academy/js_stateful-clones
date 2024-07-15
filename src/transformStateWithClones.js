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

  actions.forEach((action) => {
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

        action.keysToRemove.forEach((key) => {
          if (nextState.hasOwnProperty(key)) {
            delete nextState[key];
          }
        });
        break;
      default:
        nextState = { ...currentState };
        break;
    }

    stateHistory.push(nextState);
    currentState = nextState; // Update currentState for the next iteration
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
