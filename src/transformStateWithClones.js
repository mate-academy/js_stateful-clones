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

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        break;
    }

    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
