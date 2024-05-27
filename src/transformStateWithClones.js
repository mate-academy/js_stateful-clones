'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultStates = [];

  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(stateCopy, action.extraData);
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      }

      case 'clear': {
        stateCopy = {};
        break;
      }

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    resultStates.push({ ...stateCopy });
  }

  return resultStates;
}

module.exports = transformStateWithClones;
