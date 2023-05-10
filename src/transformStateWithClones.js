'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newObj = { ...state };
  const actionsLog = [];

  for (const action of actions) {
    switch (action.type) {
      case 'removeProperties' :
        for (const key of action.keysToRemove) {
          delete newObj[key];
        }
        actionsLog.push({ ...newObj });
        break;

      case 'addProperties':
        for (const key in action.extraData) {
          newObj[key] = action.extraData[key];
        }
        actionsLog.push({ ...newObj });
        break;

      case 'clear':
        for (const key in newObj) {
          delete newObj[key];
        }
        actionsLog.push({ ...newObj });
        break;

      default:
        throw new Error('Unknown action type');
    }
  }

  return actionsLog;
}

module.exports = transformStateWithClones;
