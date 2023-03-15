'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actionions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actionions) {
  const finalArray = [];
  const newObj = { ...state };

  for (const action of actionions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newObj, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newObj[key];
        }
        break;

      case 'clear':
        for (const stateKey in newObj) {
          delete newObj[stateKey];
        }
        break;

      default:
        throw new Error();
    }

    finalArray.push({ ...newObj });
  }

  return finalArray;
}

module.exports = transformStateWithClones;
