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

  for (const a of actions) {
    switch (a.type) {
      case 'addProperties':
        Object.assign(stateCopy, a.extraData);

        break;

      case 'removeProperties':
        for (const k of a.keysToRemove) {
          delete stateCopy[k];
        }

        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }

        break;

      default:
        return stateHistory;
    }
    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
