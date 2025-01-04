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

  actions.forEach((action) => {
    let newState = { ...currentState };

    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        newState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete newState[key];
        });
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    currentState = newState;
    stateHistory.push(currentState);
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
