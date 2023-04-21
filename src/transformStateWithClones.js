'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArray = [];
  let newObject = { ...state };

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        Object.assign(newObject, key.extraData);
        break;
      case 'removeProperties':
        for (const deleteKey of key.keysToRemove) {
          delete newObject[deleteKey];
        }
        break;
      case 'clear':
        newObject = {};
        break;

      default:
        return 'Error';
    }
    newArray.push({ ...newObject });
  }

  return newArray;
}

module.exports = transformStateWithClones;
