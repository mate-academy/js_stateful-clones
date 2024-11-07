'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const statesHistory = [];

  actions.forEach((action) => {
    let nextState = { ...currentState };

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;

      case 'addProperties':
        nextState = { ...nextState, ...action.extraData };
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete nextState[key];
        });
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    currentState = nextState;
    statesHistory.push(nextState);
  });

  return statesHistory;
}

module.exports = transformStateWithClones;
