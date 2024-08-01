'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        clearObject(stateCopy);
        break;

      case 'addProperties':
        addProperties(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);
        break;

      default:
        return stateCopy;
    }
  }
}

function clearObject(object) {
  for (const key in object) {
    delete object[key];
  }

  return object;
}

function addProperties(object, array) {
  Object.assign(object, array);

  return object;
}

function removeProperties(object, array) {
  for (const key in array) {
    delete object[array[key]];
  }

  return object;
}

module.exports = transformStateWithClones;
