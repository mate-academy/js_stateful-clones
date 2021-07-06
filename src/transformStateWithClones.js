'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  const copy = { ...state };

  for (const object of transforms) {
    switch (object['operation']) {
      case 'addProperties': {
        for (const prop in object['properties']) {
          copy[prop] = object['properties'][prop];
        }
        break;
      }

      case 'removeProperties': {
        for (const prop of object['properties']) {
          delete copy[prop];
        }
        break;
      }

      case 'clear': {
        for (const prop in copy) {
          delete copy[prop];
        }
        break;
      }

      default: {
        return 'Invalid case';
      }
    }

    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;
