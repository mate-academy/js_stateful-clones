'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionHistory = [];
  let stateCopy = {};
  let count = 0;

  for (const action of actions) {
    if (count === 0) {
      Object.assign(stateCopy, state, action.extraData);
      count++;
    }

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        if (action.keysToRemove) {
          for (const key of action.keysToRemove) {
            delete stateCopy[key];
          }
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        return state;
    }
    actionHistory.push({ ...stateCopy });
  }

  return actionHistory;
}

module.exports = transformStateWithClones;
