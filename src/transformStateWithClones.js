'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = Object.assign({}, state);
  const arrayResult = [];

  for (const item of actions) {
    switch (item.type) {
      case 'addProperties': {
        for (const key in item.extraData) {
          stateCopy[key] = item.extraData[key];
        }
        arrayResult.push({ ...stateCopy });
        break;
      }

      case 'removeProperties': {
        for (const key of item.keysToRemove) {
          delete stateCopy[key];
        }
        arrayResult.push({ ...stateCopy });
        break;
      }

      case 'clear': {
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        arrayResult.push({ ...stateCopy });
        break;
      }

      default:
        return 'Some error';
    }
  }

  return arrayResult;
}

module.exports = transformStateWithClones;
