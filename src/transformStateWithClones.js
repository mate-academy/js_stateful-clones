'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesHistory = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(stateCopy, action.extraData);
        break;
      }

      case 'removeProperties': {
        for (const keyToRemove of action.keysToRemove) {
          delete stateCopy[keyToRemove];
        }
        break;
      }

      case 'clear': {
        stateCopy = {};
        break;
      }

      default:
        throw new Error('Some error');
    }
    statesHistory.push({ ...stateCopy });
  }

  return statesHistory;
}

module.exports = transformStateWithClones;
