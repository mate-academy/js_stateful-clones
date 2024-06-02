'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const finalResultArray = [];
  const stateCopy = { ...state };

  actions.forEach((el) => {
    switch (el.type) {
      case 'addProperties': {
        for (const keys in el.extraData) {
          stateCopy[keys] = el.extraData[keys];
        }
        break;
      }

      case 'removeProperties': {
        el.keysToRemove.forEach((key) => {
          delete stateCopy[key];
        });
        break;
      }

      case 'clear': {
        for (const properties in stateCopy) {
          delete stateCopy[properties];
        }
        break;
      }
      default:
        break;
    }
    finalResultArray.push({ ...stateCopy });
  });

  return finalResultArray;
}

module.exports = transformStateWithClones;
