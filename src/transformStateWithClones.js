'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  let initialObj = { ...state };

  for (const { type,
    extraData: propertiesToAdd,
    keysToRemove: propertiesToDelete } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(initialObj, propertiesToAdd);
        break;

      case 'removeProperties':
        for (const key of propertiesToDelete) {
          delete initialObj[key];
        }
        break;

      case 'clear':
        initialObj = {};
        break;

      default:
        break;
    }

    resultArray.push({ ...initialObj });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
