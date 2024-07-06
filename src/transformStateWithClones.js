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
        const newStateCopy = { ...stateCopy };

        for (const key of action.keysToRemove) {
          delete newStateCopy[key];
        }
        stateCopy = newStateCopy;
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        throw new Error('Wrong action');
    }

    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
