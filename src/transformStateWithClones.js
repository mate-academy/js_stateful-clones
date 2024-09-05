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
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'clear':
        stateCopy = {}; // Reset to an empty object
        break;
      case 'addProperties':
        stateCopy = { ...stateCopy, ...extraData };
        break;
      case 'removeProperties':
        keysToRemove.forEach((key) => {
          delete stateCopy[key]; // Remove specified properties
        });
        break;
      default:
        throw new Error(`Unknown action type: ${type}`);
    }
    stateHistory.push({ ...stateCopy });
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
