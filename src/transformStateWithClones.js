'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayResult = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'clear': {
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
      }

      case 'addProperties': {
        for (const key in extraData) {
          stateCopy[key] = extraData[key];
        }
        break;
      }

      case 'removeProperties': {
        for (const key of keysToRemove) {
          delete stateCopy[key];
        }
        break;
      }
      default:
        break;
    }
    arrayResult.push({ ...stateCopy });
  }

  return arrayResult;
}

module.exports = transformStateWithClones;
