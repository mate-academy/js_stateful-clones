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
        break;

      case 'removeProperties':
        for (const item of action.keysToRemove) {
          if (Object.keys(stateCopy).includes(item)) {
            delete stateCopy[item];
          }
        }
        break;

      case 'clear':
        for (const item in stateCopy) {
          delete stateCopy[item];
        }
        break;
    }

    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
