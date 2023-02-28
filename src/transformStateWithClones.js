'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArr = [];
  const stateCopy = {
    ...state,
  };

  for (const obj of actions) {
    switch (obj.type) {
      case 'clear': {
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
      }

      case 'addProperties': {
        for (const key in obj.extraData) {
          stateCopy[key] = obj.extraData[key];
        }
        break;
      }

      case 'removeProperties': {
        for (const key of obj.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      }
    }
    newArr.push({ ...stateCopy });
  }

  return newArr;
}

module.exports = transformStateWithClones;
