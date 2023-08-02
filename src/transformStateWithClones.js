'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const statesLog = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const stateProperty in stateCopy) {
          delete stateCopy[stateProperty];
        }
        break;

      case 'addProperties':
        for (const property in action.extraData) {
          stateCopy[property] = action.extraData[property];
        }
        break;

      case 'removeProperties':
        for (const key in action.keysToRemove) {
          if (stateCopy.hasOwnProperty(action.keysToRemove[key])) {
            delete stateCopy[action.keysToRemove[key]];
          }
        }
        break;

      default:
    }

    statesLog.push({ ...stateCopy });
  }

  return statesLog;
}

module.exports = transformStateWithClones;
