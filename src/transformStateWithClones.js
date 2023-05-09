'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const statesHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action['extraData']);
        break;

      case 'removeProperties':
        for (const key of action['keysToRemove']) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        for (const prop in stateCopy) {
          delete stateCopy[prop];
        }
        break;

      default:
        throw Error;
    }

    statesHistory.push({ ...stateCopy });
  }

  return statesHistory;
}

module.exports = transformStateWithClones;
