'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyOfState = { ...state };
  const stateCopies = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyOfState, action.extraData);
        break;

      case 'removeProperties':
        removeObjectProperties(action.keysToRemove, copyOfState);
        break;

      case 'clear':
        clearObject(copyOfState);
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    stateCopies.push({ ...copyOfState });
  }

  return stateCopies;
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
