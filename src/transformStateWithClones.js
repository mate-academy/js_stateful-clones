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

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...actions[i].extraData };
        break;

      case 'removeProperties':
        for (let k = 0; k < actions[i].keysToRemove.length; k++) {
          delete stateCopy[actions[i].keysToRemove[k]];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        throw new Error('Unknown action type');
    }

    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
