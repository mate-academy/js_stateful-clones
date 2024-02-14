'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateHistory = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(stateCopy, ...[actions[i].extraData]);
        stateHistory.push({ ...stateCopy });
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete stateCopy[key];
        }
        stateHistory.push({ ...stateCopy });
        break;

      case 'clear':
        for (const key of Object.keys(stateCopy)) {
          delete stateCopy[key];
        }
        stateHistory.push({ ...stateCopy });
        break;

      default:
        return 'Wrong input!';
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
