'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function removeProperties(object, keysToRemove) {
  for (const key of keysToRemove) {
    delete object[key];
  }
}

function clearObject(object) {
  for (const key in object) {
    delete object[key];
  }
}

function addProperties(object, propertiesToAdd) {
  Object.assign(object, propertiesToAdd);
}

function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(copyState, action.extraData);
        result[result.length] = { ...copyState };

        break;

      case 'clear':
        clearObject(copyState);
        result[result.length] = { ...copyState };

        break;

      case 'removeProperties':
        removeProperties(copyState, action.keysToRemove);
        result[result.length] = { ...copyState };

        break;

      default:
        throw new Error('Invalid action type');
    }
  }

  return result;
}

module.exports = transformStateWithClones;
