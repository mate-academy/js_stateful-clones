'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  const copy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copy, action.extraData);
        break;
      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete copy[keyToRemove];
        }
        break;
      case 'clear':
        for (const key in copy) {
          delete copy[key];
        }
        break;
      default:
        break;
    }
    resultArray.push({ ...copy });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
