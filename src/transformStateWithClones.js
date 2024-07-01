'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const stateCopy = { ...state };

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          stateCopy[key] = action.extraData[key];
        }
        stateHistory.push({ ...stateCopy });
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        stateHistory.push({ ...stateCopy });
        break;
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        stateHistory.push({ ...stateCopy });
        break;
      default:
        break;
    }
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
