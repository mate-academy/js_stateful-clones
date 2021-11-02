'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newObject = { ...state };
  const result = [];

  for (const object of actions) {
    switch (object.type) {
      case 'addProperties':
        newObject = {
          ...newObject,
          ...object.extraData,
        };
        break;

      case 'removeProperties':
        for (const value of object.keysToRemove) {
          delete newObject[value];
        }
        break;

      case 'clear':
        for (const key in newObject) {
          delete newObject[key];
        }
        break;

      default:
        return 'undefined';
    }
    result.push({ ...newObject });
  }

  return result;
}

module.exports = transformStateWithClones;
