'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const resultingdArray = [];

  for (const { type,
    extraData: propertiesToAdd,
    keysToRemove: propertiesToDelete } of actions) {
    stateCopy = { ...stateCopy };

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, propertiesToAdd);
        resultingdArray.push(stateCopy);
        break;

      case 'removeProperties':
        for (const toRemove of propertiesToDelete) {
          delete stateCopy[toRemove];
        }
        resultingdArray.push(stateCopy);
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        resultingdArray.push(stateCopy);
        break;

      default:
        break;
    }
  }

  return resultingdArray;
}

module.exports = transformStateWithClones;
