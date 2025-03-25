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
    if (!action || !action.type) {
      throw new Error(`Invalid action object: ${JSON.stringify(action)}`);
    }

    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        if (!action.extraData || typeof action.extraData !== 'object') {
          throw new Error(
            `Invalid extraData: ${JSON.stringify(action.extraData)}`,
          );
        }
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        if (!Array.isArray(action.keysToRemove)) {
          throw new Error(
            `Invalid keysToRemove: ${JSON.stringify(action.keysToRemove)}`,
          );
        }
        currentState = { ...currentState };

        action.keysToRemove.forEach((key) => {
          delete currentState[key];
        });
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    // Push a copy of the current state to the history array
    stateHistory.push({ ...currentState });
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
