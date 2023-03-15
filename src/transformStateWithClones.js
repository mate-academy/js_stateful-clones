'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateArr = [];

  for (const prop of actions) {
    switch (prop.type) {
      case 'addProperties':
        for (const extra in prop.extraData) {
          stateCopy[extra] = prop.extraData[extra];
        }
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      case 'removeProperties':
        for (const key of prop.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      default:
        throw new Error('Unknown type');
    }

    stateArr.push({ ...stateCopy });
  }

  return stateArr;
}

module.exports = transformStateWithClones;
