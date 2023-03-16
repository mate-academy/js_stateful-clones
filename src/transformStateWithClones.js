'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  // write code here
  const transformed = [];
  let newState = { ...state };

  for (const object of actions) {
    switch (object.type) {
      case 'addProperties': {
        Object.assign(newState, object.extraData);
        transformed.push({ ...newState });
        break;
      }

      case 'clear': {
        newState = {};
        transformed.push({});
        break;
      }

      case 'removeProperties': {
        for (const remove of object.keysToRemove) {
          delete newState[remove];
        }
        transformed.push({ ...newState });
        break;
      }

      default:
        return object.type;
    }
  }

  return transformed;
}

module.exports = transformStateWithClones;
