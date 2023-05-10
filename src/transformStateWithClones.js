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
  const stateCopy = { ...state };
  const stateClones = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateCopy, action.extraData);

        break;

      case 'clear':
        clearObject(stateCopy);

        break;

      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);

        break;

      default:
        throw new Error('Invalid action type');
    }

    stateClones.push({ ...stateCopy });
  }

  return stateClones;
}

module.exports = transformStateWithClones;
