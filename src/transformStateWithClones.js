'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  // Initialize with a clone of the original state
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        // Add properties from extraData
        stateCopy = { ...stateCopy, ...action.extraData };
        break;

      case 'removeProperties':
        // Remove specified keys
        stateCopy = { ...stateCopy };

        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        // Clear the state by creating an empty object
        stateCopy = {};
        break;

      default:
        // Handle unexpected action types
        throw new Error(`Unknown action type: ${action.type}`);
    }

    // Add the current state snapshot to the history
    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
