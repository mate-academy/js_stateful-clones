'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const resultArray = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        for (const key in actions[i].extraData) {
          stateCopy[key] = actions[i].extraData[key];
        }
        resultArray.push({ ...stateCopy });
        break;

      case 'removeProperties':
        for (let j = 0; j < actions[i].keysToRemove.length; j++) {
          delete stateCopy[actions[i].keysToRemove[j]];
        }
        resultArray.push({ ...stateCopy });
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        resultArray.push({ ...stateCopy });
        break;

      default:
        break;
    }
  }

  return resultArray;
}

module.exports = transformStateWithClones;
