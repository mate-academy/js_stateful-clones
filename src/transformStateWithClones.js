'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];

  let stateCopy = { ...state };

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete stateCopy[key]);
        break;
      default:
        throw new Error('Unknown action');
    }

    stateHistory.push({ ...stateCopy });
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
