'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let tempObject = { ...state };
  const result = [];

  for (const object of actions) {
    switch (object.type) {
      case 'addProperties':
        for (const property in object.extraData) {
          tempObject[property] = object.extraData[property];
        }
        break;

      case 'removeProperties':
        for (const property of object.keysToRemove) {
          if (property in tempObject) {
            delete tempObject[property];
          }
        }
        break;

      case 'clear':
        tempObject = {};
        break;

      default:
        throw new Error('Unknown type');
    }

    result.push({ ...tempObject });
  }

  return result;
}

module.exports = transformStateWithClones;
