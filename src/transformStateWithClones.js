'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateLog = [];

  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          stateCopy[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (let i = 0; i < action.keysToRemove.length; i++) {
          if (stateCopy.hasOwnProperty(action.keysToRemove[i])) {
            delete stateCopy[action.keysToRemove[i]];
          }
        }
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default:
        return 'Wrong input data';
    }
    stateLog.push({ ...stateCopy });
  }

  return stateLog;
}

module.exports = transformStateWithClones;
