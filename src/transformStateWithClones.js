'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const actionsHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        actionsHistory.push({ ...stateCopy });

        break;

      case 'clear':
        stateCopy = {};
        actionsHistory.push({});

        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (key in stateCopy) {
            delete stateCopy[key];
          }
        }
        actionsHistory.push({ ...stateCopy });

        break;

      default:
        throw new Error('Unknown action type: ' + action.type);
    }
  }

  return actionsHistory;
}
module.exports = transformStateWithClones;
