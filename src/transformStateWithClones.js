'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistoryArray = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        stateHistoryArray.push({ ...stateCopy });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        stateHistoryArray.push({ ...stateCopy });
        break;

      case 'clear':
        stateCopy = {};
        stateHistoryArray.push({ ...stateCopy });
        break;

      default:
        break;
    }
  }

  return stateHistoryArray;
}

module.exports = transformStateWithClones;
