'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionsHistory = [];
  const newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => delete newState[key]);
        break;
      case 'clear':
        Object.keys(newState).forEach(key => delete newState[key]);
        break;

      default:
        return 'Error, probably the wrong parameter was specified.';
    }

    actionsHistory.push({ ...newState });
  }

  return actionsHistory;
}

module.exports = transformStateWithClones;
