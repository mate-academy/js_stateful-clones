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

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const i of action.keysToRemove) {
          if (stateCopy[i]) {
            delete stateCopy[i];
          }
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
    }
    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
