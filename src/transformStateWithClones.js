'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopies = [];
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
        continue;
    }

    stateCopies.push({ ...stateCopy });
  }

  return stateCopies;
}

function clearObject(object) {
  for (const key in object) {
    delete object[key];
  }

  // return object.push(object);
}

function addProperties(object, array) {
  Object.assign(object, array);

  // return object.push(object)]);
}

function removeProperties(object, array) {
  for (const key in array) {
    delete object[array[key]];
  }

  // return object.push([Object(object)]);
}

module.exports = transformStateWithClones;
