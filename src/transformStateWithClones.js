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

  actions.forEach((action) => {
    let newState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete newState[key]);
        break;
      case 'clear':
        newState = {};
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    stateHistory.push(newState);
    currentState = newState;
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
