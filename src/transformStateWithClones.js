'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = Object.assign({}, state);
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          stateCopy[key] = action.extraData[key];
        }

        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }

        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }

        break;
      default:
        break;
    }

    stateHistory.push(Object.assign({}, stateCopy));
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
