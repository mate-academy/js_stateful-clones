'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];
  const stateCopy = { ...state };

  for (const items of actions) {
    switch (items.type) {
      case 'addProperties':
        Object.assign(stateCopy, items.extraData);
        break;

      case 'removeProperties':
        items.keysToRemove.forEach((key) => delete stateCopy[key]);
        break;

      case 'clear':
        for (const keys in stateCopy) {
          delete stateCopy[keys];
        }
        break;

      default:
        break;
    }
    resultArr.push({ ...stateCopy });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
