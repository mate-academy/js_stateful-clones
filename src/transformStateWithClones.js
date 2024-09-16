'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  // write code here
  const transformedState = [];
  let newState = { ...state };

  for (const object of actions) {
    switch (object.type) {
      case 'addProperties': {
        Object.assign(newState, object.extraData);
        break;
      }

      case 'clear': {
        newState = {};
        break;
      }

      case 'removeProperties': {
        for (const remove of object.keysToRemove) {
          delete newState[remove];
        }
        break;
      }

      default:
        return object.type;
    }
    transformedState.push({ ...newState });
  }

  return transformedState;
}

module.exports = transformStateWithClones;
