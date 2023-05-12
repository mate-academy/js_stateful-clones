'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const versionsOfState = { ...state };
  const arrayOfCopies = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(versionsOfState, action.extraData);
        break;

      case 'removeProperties':
        removeObjectProperties(action.keysToRemove, versionsOfState);
        break;

      case 'clear':
        clearObject(versionsOfState);
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    arrayOfCopies.push({ ...versionsOfState });
  }

  return arrayOfCopies;
}

function clearObject(object) {
  for (const key in object) {
    delete object[key];
  }
}

function removeObjectProperties(propertiesObject, objectToModify) {
  for (const key of propertiesObject) {
    delete objectToModify[key];
  }
}

module.exports = transformStateWithClones;
