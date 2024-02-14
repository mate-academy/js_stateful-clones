'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const resArr = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      case 'addProperties':
        for (const key in extraData) {
          stateCopy[key] = extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key in keysToRemove) {
          delete stateCopy[keysToRemove[key]];
        }
        break;
        
      default:
        throw new Error('Unknown type');  
    }

    resArr.push({ ...stateCopy });
  }

  return resArr;
}

module.exports = transformStateWithClones;
