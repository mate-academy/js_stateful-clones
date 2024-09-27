'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionsHistory = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => delete stateCopy[key]);
        break;
      case 'clear':
        Object.keys(stateCopy).forEach(key => delete stateCopy[key]);
        break;

      default:
        return 'Error, probably the wrong parameter was specified.';
    }

    actionsHistory.push({ ...stateCopy });
  }

  return actionsHistory;
}

module.exports = transformStateWithClones;
