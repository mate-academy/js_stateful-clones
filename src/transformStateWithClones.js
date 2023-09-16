'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentStateCopy = { ...state };
  const resultArray = [];

  for (const element of actions) {
    switch (element.type) {
      case 'addProperties':
        Object.assign(currentStateCopy, element.extraData);
        break;

      case 'removeProperties':
        for (const removeElement of element.keysToRemove) {
          delete currentStateCopy[removeElement];
        }
        break;

      case 'clear':
        currentStateCopy = {};
        break;

      default:
        currentStateCopy = { ...state };
        break;
    }

    resultArray.push({ ...currentStateCopy });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
