'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const stateCopy = Object.assign({}, state);

  for (const element of actions) {
    switch (element.type) {
      case 'addProperties':
        Object.assign(stateCopy, element.extraData);
        break;

      case 'removeProperties':
        for (const key of element.keysToRemove) {
          if (key in stateCopy) {
            delete stateCopy[key];
          }
        }
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default:
        throw new Error(`Unknown action type: ${element.type}`);
    }

    stateHistory.push(Object.assign({}, stateCopy));
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
