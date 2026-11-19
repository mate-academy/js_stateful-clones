'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const logs = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear': {
        stateCopy = {};
        break;
      }

      case 'addProperties': {
        stateCopy = Object.assign(stateCopy, action.extraData);
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      }

      default:
        return;
    }
    logs.push({ ...stateCopy });
  }

  return logs;
}

module.exports = transformStateWithClones;
