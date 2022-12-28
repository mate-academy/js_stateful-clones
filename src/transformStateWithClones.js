'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];
  let stateCopy = { ...state };

  for (const items of actions) {
    switch (items.type) {
      case 'addProperties':
        Object.assign(stateCopy, items.extraData);
        break;

      case 'removeProperties':
        items.keysToRemove.forEach((key) => delete stateCopy[key]);
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        break;
    }
    resultArr.push({ ...stateCopy });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
