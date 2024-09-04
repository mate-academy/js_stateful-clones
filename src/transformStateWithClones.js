'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const stateHistory = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        stateCopy = {}; // Reset to an empty object
        break;
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete stateCopy[key]; // Remove specified properties
        });
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    stateHistory.push({ ...stateCopy });
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
