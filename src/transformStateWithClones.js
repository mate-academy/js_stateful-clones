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
        stateCopy = {
          ...stateCopy, ...action.extraData,
        };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (key in stateCopy) {
            delete stateCopy[key];
          }
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        throw new Error('Uncorrect action type');
    }

    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
