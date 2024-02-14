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

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
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
        return 'Wrong input!';
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
