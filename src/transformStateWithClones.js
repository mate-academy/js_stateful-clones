'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateHistory = [];
  let stateCopy = { ...state }; // Start with a clone of the initial state

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete stateCopy[key];
        });
        break;
      case 'clear':
        stateCopy = {};
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    stateHistory.push({ ...stateCopy });
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
