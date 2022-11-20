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

  for (const { type, extraData: toAdd, keysToRemove: toDelete } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(initialObj, toAdd);
        break;

      case 'removeProperties':
        for (const key of toDelete) {
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
