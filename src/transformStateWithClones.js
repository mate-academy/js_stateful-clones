'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const finalResult = [];
  const cloneCopy = { ...state };

  actions.forEach((el) => {
    switch (el.type) {
      case 'addProperties': {
        for (const keys in el.extraData) {
          cloneCopy[keys] = el.extraData[keys];
        }

        finalResult.push({ ...cloneCopy });
        break;
      }

      case 'removeProperties': {
        el.keysToRemove.forEach((key) => {
          delete cloneCopy[key];
        });

        finalResult.push({ ...cloneCopy });
        break;
      }

      case 'clear': {
        for (const properties in cloneCopy) {
          delete cloneCopy[properties];
        }

        finalResult.push({ ...cloneCopy });
        break;
      }
      default:
        break;
    }
  });

  return finalResult;
}

module.exports = transformStateWithClones;
