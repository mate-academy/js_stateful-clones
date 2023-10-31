'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  // write code here
  const array = [];
  const stateCopy = { ...state };
  let pushedCopy = {};

  for (const object of actions) {
    switch (object.type) {
      case 'addProperties':
      // tried spread operator, but somethig is off with it,
      // so let's go with for loop.

        for (const key in object.extraData) {
          stateCopy[key] = object.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of object.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default:
        return 'broken data - input right data';
    }
    pushedCopy = { ...stateCopy };
    array.push(pushedCopy);
  }

  return array;
}

module.exports = transformStateWithClones;
